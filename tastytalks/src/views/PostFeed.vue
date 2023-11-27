<template>

    <main>
        
    </main>

</template>

<script>
import {onSnapshot,collection,doc,orderBy,query} from 'firebase/firestore';
import { ref } from 'vue';

export default{

    data:()=>{
        return {
            recipes:ref([])
        }
    },
    mounted() {
        const latestQuery = query(collection(db,"recipes"),orderBy('date'));
        const liveRecipes = onSnapshot(latestQuery,(snapshot)=>{
            this.messages = snapshot.docs.map((doc) => {
                return {
                title:doc.data().title,
                date:doc.data().date,
                ingredients:doc.data().ingredients,
                instructions:doc.data().instructions, 
                summary:doc.data().summary,
                region:doc.data().regionID,
                tags:doc.data().tags
                }
            });
        });
        onUnmounted(liveRecipes)
  }

}

</script>


<style scoped>


</style>