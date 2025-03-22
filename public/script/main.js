function heightComparisonApp() {
  return {
    avatars: [],
    newAvatar: {
      name: '',
      height: 170,
      color: '#4b9cd3',
    },

    addAvatar() {
      this.newAvatar = { name: '', height: 170, color: '#4b9cd3' };
    },

    saveAvatar() {
      if (this.newAvatar.name && this.newAvatar.height) {
        this.avatars.push({ ...this.newAvatar });
        this.newAvatar = { name: '', height: 170, color: '#4b9cd3' };
      }
    }
  }
}
