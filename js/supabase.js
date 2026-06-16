const supabaseUrl =
"https://hscnacdaopjmgvvapzge.supabase.co";

const supabaseKey =
"sb_publishable_PJMMszIxJLY6iHuRVWickA_RiG-rPTU";

window.supabaseClient =
window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);

console.log("Supabase Connected");
console.log(window.supabaseClient);