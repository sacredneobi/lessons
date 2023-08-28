const defAnswer = (res) => (data) => {
  if (typeof res?.send === "function") {
    res.json(data ? data : { ok: true });
  }
};

const defAnswerError =
  (res, errorStatus = 500, errorMessage) =>
  (err) => {
    console.log(`\x1b[31mERROR:\x1b[0m`, err);
    if (typeof res?.status === "function") {
      res
        .status(errorStatus)
        .send(
          errorMessage
            ? errorMessage
            : { error: err?.myError ? err.myError : err?.message }
        );
    }
  };

module.exports = { defAnswer, defAnswerError };
