import React from "react";
import css from './../styles/Profile.module.css'

export default function Pantry() {
    return <main className={css.container}>
    <section className={css.profileAvatar}>
      <img
        src="https://cdn.glitch.global/cb1713d8-3561-424d-9fd8-837e3fcd405d/avatar.png?v=1732142547096"
        alt="Avatar"
      />
    </section>
    <section className={css.accountInfo}>
      <div className={css.name}>
        <label for="name">Name:</label><br />
        <input
          type="text"
          id="fname"
          name="name"
          value="John Doe"
          disabled
        /><br />
      </div>
      <div className={css.email}>
        <label for="email">Email:</label><br />
        <input
          type="text"
          id="lname"
          name="email"
          value="smith@gmail.com"
          disabled
        /><br /><br />
      </div>
      <div className={css.password}>
        <label for="pwd">Password:</label><br />
        <input type="password" id="pwd" name="pwd" value="secret" disabled />
      </div>
    </section>
  </main>
}

