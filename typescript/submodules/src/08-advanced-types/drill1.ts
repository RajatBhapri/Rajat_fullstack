type Status = "loading" | "success" | "error";

function handle(status: Status): void {
  switch (status) {
    case "loading":
      console.log("loading");
      break;

    case "success":
      console.log("success");
      break;

    case "error":
      console.log("error");
      break;

    default:
      const x: never = status;
      return x;
  }
}
