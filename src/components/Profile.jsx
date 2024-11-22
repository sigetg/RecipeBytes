import React from "react";
import './../styles/Profile.css'

export default function Pantry() {
    return <main class="container">
    <section class="profile-avatar">
      <img
        src="https://cdn.glitch.global/cb1713d8-3561-424d-9fd8-837e3fcd405d/avatar.png?v=1732142547096"
        alt="Avatar"
      />
    </section>
    <section class="account-info">
      <div class="name">
        <label for="name">Name:</label><br />
        <input
          type="text"
          id="fname"
          name="name"
          value="John Doe"
          disabled
        /><br />
      </div>
      <div class="email">
        <label for="email">Email:</label><br />
        <input
          type="text"
          id="lname"
          name="email"
          value="smith@gmail.com"
          disabled
        /><br /><br />
      </div>
      <div class="password">
        <label for="pwd">Password:</label><br />
        <input type="password" id="pwd" name="pwd" value="secret" disabled />
      </div>
    </section>
  </main>
}

