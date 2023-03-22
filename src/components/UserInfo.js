export class UserInfo {
    constructor({profileHeading, profileDescription}) {
        this._userName = profileHeading;
        this._userDescription = profileDescription;
    }
    
    getUserInfo = () => {
        this._profileValues = {fullname: this._userName.textContent, job: this._userDescription.textContent}
        return this._profileValues;
    }
    
    setUserInfo = ({fullname, job}) => {
        this._userName.textContent = fullname;
        this._userDescription.textContent = job;
    }
}