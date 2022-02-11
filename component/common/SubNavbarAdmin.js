import React from "react";
import Link from "next/link";

const SubNavBarAdmin = () => {
  return (
    <header className="footer bg-YellowPrimary-1  ">
      <nav className="w-full container flex justify-around py-8 mx-auto ">
        <div className="space-x-8 text-white">
          <Link href="/admin/Admin">
            <a>Home Admin</a>
          </Link>

          <Link href="/admin/UserAdmin">
            <a>Utilisateur</a>
          </Link>
          <Link href="/admin/EventAdmin">
            <a>Evenements</a>
          </Link>
          <Link href="/admin/CommentAdmin">
            <a>Commentaires</a>
          </Link>
        </div>
      </nav>
    </header>
  );
};
export default SubNavBarAdmin;
