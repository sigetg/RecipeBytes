import React from "react";
import css from './../styles/Profile.module.css'
import Avatar from './../assets/Avatar.png'
import { profileData } from "../data/profileData";

export default function Pantry() {
    return <main className={css.container}>
    <section className={css.profileAvatar}>
      <img
        src={Avatar}
        alt="Avatar"
      />
    </section>
    <section className={css.accountInfo}>
      {profileData.map((info) => (
        <ProfileInfo key={info} name={info.name} value={info.value} type={info.type} />
      ))}
    </section>
  </main>
}

const ProfileInfo = ( { name, value, type } ) => (
  <div className={css[name.toLowerCase()]}>
    <label for={name}>{name}:</label><br />
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      disabled
    />
  </div>
);