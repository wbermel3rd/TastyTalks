<template>
    <div class="Account-Container">
        <a href=""><i class="fa-solid fa-user user-icon"></i></a>
        <button class="btn">Settings</button>
        <button class="btn">Log Out</button>

    </div>
</template>

<script>
export default{
    name: 'SignedInHeader',
}
</script>

<style scoped>
.Account-Container{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 15px;
    padding: 15px;
}
.user-icon{
    color: gray;
    font-size: 45px;
}

.btn {
    width: auto;
    padding: 10px;
    border: none;
    border-radius: 5px;
    margin-bottom: 10px;
    cursor: pointer;
    background-color: #8CC84B;

  }

</style>