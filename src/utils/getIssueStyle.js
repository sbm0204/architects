const issueStyles = {
  경보: {
    emoji: '🛑',
    text: '경보',
    backgroundColor: '#FFC2C2',
    color: '#FF4A4A',
    headerBgColor: '#FFEAEA',
  },
  주의보: {
    emoji: '⚠️',
    text: '주의보',
    backgroundColor: '#F8EC92',
    color: '#ED850E',
    headerBgColor: '#F8F5DC',
  },
  default: {
    emoji: '',
    text: '',
    backgroundColor: '#FFFFFF',
    color: '#000000',
    headerBgColor: '#F0F0F0',
  }
};

export const getIssueStyle = (issueGbn) => {
  return issueStyles[issueGbn] || issueStyles.default;
};