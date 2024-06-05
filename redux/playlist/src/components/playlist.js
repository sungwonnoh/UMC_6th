import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  setSongs,
} from "../redux/cartSlice";
import cartItems from "../constants/cartItems";

const Playlist = () => {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.cart.list);

  useEffect(() => {
    dispatch(setSongs(cartItems));
  }, [dispatch]);

  const handleIncrease = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrease = (id) => {
    dispatch(decreaseQuantity(id));
  };

  return (
    <div>
      {songs.map((song) => (
        <div key={song.id}>
          <h3>당신이 선택한 음반</h3>
          <p>{song.title}</p>
          <p>{song.singer}</p>
          <p>{song.price}</p>
          <img src={song.img} alt={song.title} />
          <p>수량: {song.amount}</p>
          <button onClick={() => handleIncrease(song.id)}>+</button>
          <button onClick={() => handleDecrease(song.id)}>-</button>
        </div>
      ))}
    </div>
  );
};

export default Playlist;
