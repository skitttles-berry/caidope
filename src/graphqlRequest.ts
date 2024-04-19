export const graphqlRequest = async (payload: any) => {
  try {
    let token: String = ""
    const auth = localStorage.getItem("CAIDO_AUTHENTICATION")

    if (!auth) {
        return;
    } 
    
    token = JSON.parse(auth).accessToken

    const response = await fetch(document.location.origin + "/graphql", {
      body: JSON.stringify(payload),
      method: "POST",
      headers: {
        Authorization:
          "Bearer " + token ,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error during dropRequest execution:", error);
  }
};