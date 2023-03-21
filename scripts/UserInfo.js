export class UserInfo {
    constructor({profileHeading, profileDescription}) {
        this._userName = profileHeading;
        this._userDescription = profileDescription;
    }
    
    getUserInfo = () => {
        this._inputList = {fullname: this._userName.textContent, job: this._userDescription.textContent}
        return this._inputList;
    }
    
    setUserInfo = ({fullname, job}) => {
        this._userName.textContent = fullname;
        this._userDescription.textContent = job;
    }
}