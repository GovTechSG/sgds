const { jQuery } = window;
if (!jQuery) {
  throw new Error(
    "SGDS couldn't initialize; please make sure jQuery is loaded!"
  );
}
export default jQuery;