export default {
    jsonClone (obj) {
        return JSON.parse(JSON.stringify(obj))
    },

    camelCase(name){
        name = name.toLowerCase()
        name = name.replace( /_([a-z])/g, function( all, letter ) {
            return letter.toUpperCase();
        });

        return name.charAt(0).toUpperCase() + name.slice(1)
    }
}