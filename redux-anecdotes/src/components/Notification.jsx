import { useSelector } from "react-redux";

const Notification = () => {
  const notif = useSelector((state) => state.notification);

  const style = {
    border: "solid",
    padding: 10,
    margin: 10,
    borderWidth: 1,
    backgroundColor: "lightgreen",
  };

  if (notif !== null) {
    return <div style={style}>{notif.notif}</div>;
  }

  return null;
};

export default Notification;
