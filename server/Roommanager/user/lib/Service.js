class Service {
  constructor(oUserData) {
    this.iUserId = oUserData.iUserId;
    this.sUserName = oUserData.sUserName;
  }
  toJSON() {
    return _.pick(this, ['iUserId', 'sUserName']);
  }
}
