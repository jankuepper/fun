<template>
  <img
    src="https://sportshub.cbsistatic.com/i/2023/11/06/0e56b3a1-b7b4-463e-bf6a-487602557cd0/rick-and-morty-season-7-spaghetti-episode-explained.jpg"
  />
  <h1>Invitation</h1>
  <p>Hiermit lade ich euch zu meinem Foodabend ein!</p>
  <h2>Details:</h2>
  <ul>
    <li>
      <h3>Wann?</h3>
      <p>To be discussed</p>
    </li>
    <li>
      <h3>Wo?</h3>
      <p>Bei mir (Jan)</p>
    </li>
    <li>
      <h3>What food??</h3>
      <p>
        Most likely Fettuccine mit Lachs, kann sich jedoch je nach Allergene oder Vorschlaegen auch
        aendern :)
      </p>
    </li>
    <li>
      <h3>Kannst du das ueberhaupt kochen?</h3>
      <p>Idk, let's find out!</p>
    </li>
    <li>
      <h3>Was sollen wir mitbringen?</h3>
      <p>Gute Laune waere fresh</p>
    </li>
  </ul>
  <h2>Sign up:</h2>
  <p>Um besser planen zu koennen wuerde ich euch bitten ein mal folgendes auszufuellen</p>
  <div>
    <div>
      <label for="name">Name:</label>
      <input id="name" v-model="name" required />
    </div>
    <div>
      <label for="allergies">Allergien:</label>
      <input id="allergies" v-model="allergies" required />
    </div>
    <fieldset>
      <legend>Nimmst du teil?</legend>
      <label
        ><input type="radio" name="radio" v-model="radio" value="yes" checked />{{
          labelYes
        }}</label
      >
      <label><input type="radio" name="radio" v-model="radio" value="no" />{{ labelNo }}</label>
    </fieldset>
    <button @click="submit">Speichern</button>
  </div>
  <h2>Zugesagt haben:</h2>
  <div v-for="person in accepted">
    <p>{{ person?.name }}</p>
  </div>
</template>
<script lang="ts">
import { onMounted, ref, watch } from 'vue'

export default {
  setup() {
    const name = ref()
    const allergies = ref()
    const radio = ref('yes')
    const labelYes = ref('Ja')
    const labelNo = ref('Nein')
    const accepted = ref()
    watch(radio, () => {
      if (radio.value === 'no') {
        labelYes.value = 'Nein'
        labelNo.value = 'Ja'
        return
      }
      labelYes.value = 'Ja'
      labelNo.value = 'Nein'
    })
    const update = () =>
      fetch('http://jankuepper.de:3000/invites')
        .then((res) => {
          return res.json()
        })
        .then((data) => {
          accepted.value = data
        })
    onMounted(() => {
      update()
    })

    const submit = async () => {
      try {
        fetch('http://jankuepper.de:3000/invites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            name: name.value,
            allergies: allergies.value,
            accepted: radio.value
          })
        }).then(() => update())
      } catch (error) {
        console.error(error)
      }
    }
    return {
      name,
      allergies,
      radio,
      labelYes,
      labelNo,
      accepted,
      submit
    }
  }
}
</script>

<style scoped>
h1,
h2 {
  color: white;
  background-color: blueviolet;
  margin-bottom: 10px;
  margin-top: 5px;
  padding-left: 10px;
}
img {
  opacity: 0.9;
  width: 100%;
}
</style>
