export class UserInfo {
    constructor({profileHeading, profileDescription, profileAvatar}) {
        this._userName = profileHeading;
        this._userDescription = profileDescription;        
        this._profileAvatar = profileAvatar;
    }
    
    getUserInfo = () => {
        this._profileValues = {name: this._userName.textContent, about: this._userDescription.textContent}
        return this._profileValues;
    }
    
    setUserInfo = ({name, about, avatar}) => {
        this._userName.textContent = name;
        this._userDescription.textContent = about;
        this._profileAvatar.src = avatar;
    }
}