class numeroRandom{
    getRandomNumber(): number {
        const crypto = window.crypto;
        let array = new Uint32Array(1);
        crypto.getRandomValues(array);
        let numeroAleatorio = array[0];
        return numeroAleatorio;
    }
} 

export default numeroRandom;