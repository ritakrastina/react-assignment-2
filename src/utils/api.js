function postEmails(emailList) {
  return fetch("https://toggl-hire-frontend-homework.vercel.app/api/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ emails: emailList }),
  })
    .then((response) => {
      return response.text();
    })
    .then((body) => {
      if (body.length) {
        try {
          return JSON.parse(body);
        } catch (e) {
          return { error: e.message };
        }
      }

      return {};
    });
}

export { postEmails };
