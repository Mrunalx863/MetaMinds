'use client'; // Add this line at the top of the file

import Link from "next/link";
import Image from "./Image";
import { useState } from "react";

const menuList = [
  { id: 1, name: "Homepage", link: "/", icon: "home01.svg" },
  { id: 2, name: "Explore", link: "/", icon: "hyy.svg" },
  { id: 3, name: "Notification", link: "/", icon: "notification01.svg" },
  { id: 4, name: "Bookmarks", link: "/", icon: "bookmark01.svg" },
  { id: 5, name: "More", link: "/", icon: "more01.svg" },
];

const LeftBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsFormOpen(false); // Also close the form when modal closes
  };

  const openForm = () => {
    setIsFormOpen(true);
  };

  const handleWalletConnect = (e) => {
    e.preventDefault();
    alert(`Wallet Connected: ${walletAddress}`);
    closeModal();
  };

  return (
    <div className="h-screen sticky top-0 flex flex-col justify-between pt-2 pb-8">
      {/* Menu toggle button */}
      <button
        onClick={toggleMenu}
        className="flex items-center justify-center p-2 rounded-full hover:bg-[#181818] mb-4"
      >
        <Image path="icons/drop.svg" alt="toggle menu" w={24} h={24} />
      </button>

      {/* MENU LIST */}
      {isMenuOpen && (
        <div className="flex flex-col gap-4">
          {menuList.map((item) => (
            <Link
              href={item.link}
              className="p-2 rounded-full hover:bg-[#181818] flex items-center gap-4"
              key={item.id}
            >
              <Image path={`icons/${item.icon}`} alt={item.name} w={24} h={24} />
              <span className="hidden xxl:inline">{item.name}</span>
            </Link>
          ))}
        </div>
      )}

      {/* USER AND WALLET BUTTONS */}
      <div className="flex flex-col items-center gap-4 mt-auto">
        {/* WALLET BUTTON */}
        <button
          onClick={openModal}
          className="bg-white text-black rounded-full w-12 h-12 flex items-center justify-center"
        >
          <Image path="icons/wallet.svg" alt="new post" w={24} h={24} />
        </button>

        {/* USER PROFILE */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 relative rounded-full overflow-hidden">
            <Image path="/general/avatar.png" alt="lama dev" w={100} h={100} tr={true} />
          </div>
          <div>
            <span className="text-sm text-textGray">@ShareMinds</span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            {!isFormOpen ? (
              <>
                <h2 className="text-xl font-semibold mb-4">Choose Crypto Wallet</h2>
                <div className="flex flex-col gap-4">
                  {/* PeraWallet Button */}
                  <button
                    onClick={openForm}
                    className="bg-gray-300 text-black p-2 rounded-lg flex items-center gap-2"
                  >
                    <Image path="icons/logomark-white.svg" alt="PeraWallet" w={32} h={32} />
                    Connect PeraWallet
                  </button>
                </div>
                <button
                  onClick={closeModal}
                  className="mt-4 text-red-500 font-semibold"
                >
                  Close
                </button>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-4">Enter PeraWallet Details</h2>
                <form onSubmit={handleWalletConnect} className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Enter your Wallet Address"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-black p-2 rounded-lg"
                  >
                    Connect Wallet
                  </button>
                </form>
                <button
                  onClick={closeModal}
                  className="mt-4 text-red-500 font-semibold"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftBar;
