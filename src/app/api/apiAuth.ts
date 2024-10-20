export function getGuestbookAPI() {
  // setLoading(true);
  // axios.get('/guestbook/list')
  //     .then((result) => {
  //         setGuestbook(result.data.reverse());
  //         setLoading(false);
  //     });
  return [
    {
      _id: "1",
      guestName: "guestName1",
      date: "2021-09-01",
      contents: "contents",
      isUser: true,
    },
    {
      _id: "2",
      guestName: "guestName2",
      date: "2021-09-01",
      contents: "contents",
      isUser: false,
    },
    {
      _id: "3",
      guestName: "guestName3",
      date: "2021-09-01",
      contents: "contents",
      isUser: false,
    },
  ]
}   