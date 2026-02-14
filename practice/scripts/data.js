export async function fetchPrograms(){
  try {
    const response = await fetch("../data-programs.json");

    if(!response.ok){
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return data;

  } catch(error){
    console.error("Error fetching programs:", error);
    return [];
  }
}
