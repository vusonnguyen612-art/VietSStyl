import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './config';
import { SavedOutfitCard } from '../types/costume';

export interface UserProfileData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  updatedAt?: unknown;
}

/**
 * Cập nhật hoặc lưu thông tin người dùng vào Firestore
 */
export async function syncUserProfile(user: {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}): Promise<void> {
  try {
    const userRef = doc(db, 'users', user.uid);
    await setDoc(
      userRef,
      {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        lastLoginAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.warn('Lỗi khi đồng bộ hồ sơ người dùng:', error);
  }
}

/**
 * Tải danh sách toàn bộ thẻ bài bộ phối đã lưu của người dùng từ Firestore
 */
export async function fetchUserOutfitsFromFirestore(userId: string): Promise<SavedOutfitCard[]> {
  try {
    const outfitsCol = collection(db, 'users', userId, 'savedOutfits');
    const snapshot = await getDocs(outfitsCol);
    const list: SavedOutfitCard[] = [];
    snapshot.forEach((docSnap) => {
      list.push(docSnap.data() as SavedOutfitCard);
    });
    return list;
  } catch (error) {
    console.warn('Lỗi khi tải tủ đồ từ Firestore:', error);
    return [];
  }
}

/**
 * Lưu 1 bộ phối vào Firestore của người dùng
 */
export async function saveOutfitToFirestore(
  userId: string,
  outfit: SavedOutfitCard
): Promise<boolean> {
  try {
    const outfitRef = doc(db, 'users', userId, 'savedOutfits', outfit.id);
    await setDoc(outfitRef, {
      ...outfit,
      syncedAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.warn('Lỗi khi lưu bộ phối lên Firestore:', error);
    return false;
  }
}

/**
 * Xóa 1 bộ phối khỏi Firestore của người dùng
 */
export async function deleteOutfitFromFirestore(
  userId: string,
  outfitId: string
): Promise<boolean> {
  try {
    const outfitRef = doc(db, 'users', userId, 'savedOutfits', outfitId);
    await deleteDoc(outfitRef);
    return true;
  } catch (error) {
    console.warn('Lỗi khi xóa bộ phối khỏi Firestore:', error);
    return false;
  }
}

/**
 * Gộp tủ đồ từ LocalStorage lên Firestore khi người dùng vừa đăng nhập
 */
export async function syncLocalOutfitsToFirestore(
  userId: string,
  localOutfits: SavedOutfitCard[]
): Promise<SavedOutfitCard[]> {
  try {
    // 1. Tải danh sách trên đám mây về
    const cloudOutfits = await fetchUserOutfitsFromFirestore(userId);
    const cloudIds = new Set(cloudOutfits.map((item) => item.id));

    // 2. Những bộ ở local mà chưa có trên cloud thì đẩy lên
    const toUpload = localOutfits.filter((item) => !cloudIds.has(item.id));
    for (const item of toUpload) {
      await saveOutfitToFirestore(userId, item);
    }

    // 3. Kết hợp 2 nguồn (ưu tiên cloud, thêm các bộ local mới)
    const merged = [...cloudOutfits];
    for (const item of toUpload) {
      merged.push(item);
    }
    return merged;
  } catch (error) {
    console.warn('Lỗi khi gộp dữ liệu đám mây:', error);
    return localOutfits;
  }
}
