const graphRequest = async (query: string, brand?: string) => {
  const projectID = () => {
    switch (brand) {
      case "homegrid":
        return process.env.NEXT_PUBLIC_HOMEGRID_PROJECT_ID;
      case "gridbox":
        return process.env.NEXT_PUBLIC_GRIDBOX_PROJECT_ID;
      case "valence":
        return process.env.NEXT_PUBLIC_VALENCE_PROJECT_ID;
      case "aved":
        return process.env.NEXT_PUBLIC_AVED_PROJECT_ID;
      case "engineered":
        return process.env.NEXT_PUBLIC_ENGINEERED_PROJECT_ID;
      case "charger":
        return process.env.NEXT_PUBLIC_CHARGER_PROJECT_ID;
      default:
        return process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    }
  }
  const API_TOKEN = () => {
    switch (brand) {
      case "homegrid":
        return process.env.NEXT_PUBLIC_HOMEGRID_TOKEN;
      case "gridbox":
        return process.env.NEXT_PUBLIC_GRIDBOX_TOKEN;
      case "valence":
        return process.env.NEXT_PUBLIC_VALENCE_TOKEN;
      case "aved":
        return process.env.NEXT_PUBLIC_AVED_TOKEN;
      case "engineered":
        return process.env.NEXT_PUBLIC_ENGINEERED_TOKEN;
      case "charger":
        return process.env.NEXT_PUBLIC_CHARGER_TOKEN;
      default:
        return process.env.NEXT_PUBLIC_SANITY_API_TOKEN
    }
  }

  try {
    const res = await fetch(`https://${projectID()}.api.sanity.io/v1/graphql/staging/default`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_TOKEN()}`,
      },
      body: JSON.stringify({ query }),
    })
    const data = await res.json()
    return data
  } catch (error) {
    console.log(`${brand ?? 'LITHION'} GRAPHQL QUERY ERROR: `, error)
  }
}

export default graphRequest
