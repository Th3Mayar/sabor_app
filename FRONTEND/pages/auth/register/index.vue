<template>
    <div>
        <h1>Register</h1>
        <form @submit.prevent="">
        <input type="text"  placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="password"  placeholder="Password" />
        <button type="submit">Register</button>
        </form>
    </div>
</template>