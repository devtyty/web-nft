import { User } from 'model/user';

export class MyStorage {
  static readonly USER_KEY = 'USER';
  static readonly ID_ASSET = 'ID_ASSET';
  static readonly TOKEN_KEY = 'TOKEN_KEY';
  static readonly LANG_CODE_KEY = 'langCode';



  /**
   * @type {User}
   */
  static get user(): User {
    return new User(JSON.parse(localStorage.getItem(MyStorage.USER_KEY) ?? new User().toString()));
  }

    /**Lấy data của user: 
    *Nếu không tồn tại sẽ tả về user object ```User```
    * 
    * - Get: ```MyStorage.user.id != 0```
    * - Set: ```MyStorage.user = new User(json)```
    */
  static  set user(data: User) {
    localStorage.setItem(MyStorage.USER_KEY,data.toString());
  }

  /**Lấy token của user: 
   * - Nếu không tồn tại sẽ tả về rỗng.
   */
  static get token(): string {
    return localStorage.getItem(MyStorage.TOKEN_KEY) ?? '';
  }

  static  set token(token: string) {
    localStorage.setItem(MyStorage.TOKEN_KEY, token);
  }

  /**Lấy id asset của db: 
   * - Nếu không tồn tại sẽ tả về 301.
   */
   static get idAsset(): number {
    return +(localStorage.getItem(MyStorage.ID_ASSET) ?? '301');
  }

  static  set idAsset(id: number) {
    localStorage.setItem(MyStorage.ID_ASSET, `${id}`);
  }

  /**Lấy token của user: 
   * - Mặc định: ```en```
   */
  static get langCode(): string {
    return localStorage.getItem(MyStorage.LANG_CODE_KEY) ?? 'en';
  }

  static  set langCode(langCode: string) {
    localStorage.setItem(MyStorage.LANG_CODE_KEY, langCode);
  }

  static remove(key: string) {
    localStorage.removeItem(key);
  }
  
  /** Gỡ bỏ các dữ liệu đã lưu ở local (```localStorage```) */
  static resetWhenLogout() {
    this.remove(MyStorage.USER_KEY);
    this.remove(MyStorage.TOKEN_KEY);
    this.remove(MyStorage.LANG_CODE_KEY);
  }
    
}