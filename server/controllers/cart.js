import User from "../models/user.js";
import Menu from "../models/menu.js";
import { adduser } from "./user.js";

export async function additem(req, res) {
  const { email, _id } = req.body;
  let user = null;

  try {
    user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email, cart: [{ [_id]: 1 }] });
      res.json({ success: true });
      return;
    }

    const cartItem = { [_id]: 1 };
    const cart = [...user.cart, cartItem];
    // console.log(email)
    const val = await User.findOneAndUpdate(
      { email: email },
      { cart: cart },
      { new: true }
    );
    // console.log(val)
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

export async function getCart(req, res) {
  const email = req.query.email;
  //console.log(email);
  if (email) {
    const cartItems = await User.findOne({ email }).then(
      (result) => {
        if(result===null){
          return []
        }
        return result.cart
      }
    );
    //console.log(cartItems);
    if (cartItems.length === 0) {
      res.json({ success: false });
    } else {
      const cartItemsVal = cartItems.map((val) => Object.entries(val));
      //console.log(cartItemsVal);
      let itemsInCart = [];
      await Promise.all(
        cartItemsVal.map(async (filter) => {
          await Menu.findById(filter[0][0]).then((result) =>
            itemsInCart.push({
              _id: result._id,
              name: result.name,
              recipe: result.recipe,
              image: result.image,
              category: result.category,
              price: result.price,
              quantity: filter[0][1],
            })
          );
        })
      );
      //console.log(itemsInCart);
      res.json({ success: true, cart: itemsInCart });
    }
  }
}

export async function deleteItem(req, res) {
  const { email, id } = req.query;
  const user = await User.findOne({ email: email });
  //console.log(user.cart)
  const cartItems = user?.cart.filter((val) => Object.keys(val) != id);
  await User.findOneAndUpdate(
    { email: email },
    { cart: cartItems },
    { new: true }
  );
  res.json({ success: true });
}

export async function manipluateQuantity(req, res) {
  const { id } = req.params;
  const { email } = req.query;
  const cart = req.body.cart;
  const updatedCart = cart.map((item) => {
    const foodid = item._id;
    let quantity = item.quantity;
    if (id == item._id) {
      quantity = req.body.quantity;
    }
    return { [foodid]: quantity };
  });
  await User.findOneAndUpdate(
    { email: email },
    { email: email, cart: updatedCart }
  );
  res.json({ success: true });
}
