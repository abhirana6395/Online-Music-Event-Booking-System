import { X, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartSidebar({ setOpenCart }) {
  const { cart, removeFromCart, increaseQty, decreaseQty, total } = useCart();

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Blur Background */}
      <div
        className="flex-1 bg-black/60 backdrop-blur-sm"
        onClick={() => setOpenCart(false)}
      />

      {/* RIGHT SIDEBAR */}
      <div className="w-80 bg-[#3A0155] h-full shadow-2xl border-l border-pink-500/40 
        animate-slideLeft pt-6 px-5 flex flex-col text-white">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Your Cart</h2>

          <button
            onClick={() => setOpenCart(false)}
            className="text-white hover:text-pink-400"
          >
            <X size={22} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto space-y-5 pr-2">
          {cart.length === 0 && (
            <p className="text-center text-purple-300 mt-20">Cart is empty</p>
          )}

          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-[#51007A]/40 border border-purple-500/30 
                  rounded-xl p-4 shadow-[0_0_15px_#ff00ff30]"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-md font-semibold">{item.title}</h3>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-400 hover:text-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="flex justify-between items-center">
                {/* Quantity Control */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="w-7 h-7 flex items-center justify-center bg-pink-600 
                      hover:bg-pink-700 rounded-full"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="text-lg">{item.qty}</span>

                  <button
                    onClick={() => increaseQty(item.id)}
                    className="w-7 h-7 flex items-center justify-center bg-pink-600 
                      hover:bg-pink-700 rounded-full"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Price */}
                <p className="text-lg font-bold">${item.price * item.qty}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-purple-500/40">
          <div className="flex justify-between text-lg font-semibold mb-4">
            <span>Total</span>
            <span>${total}</span>
          </div>

          <button className="w-full bg-pink-600 hover:bg-pink-700 py-3 rounded-full 
            font-semibold shadow-[0_0_20px_#ff00ff]">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
