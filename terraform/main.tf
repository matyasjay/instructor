terraform { 
  cloud { 
    organization = "matyasjay" 
    workspaces { 
      name = "development" 
    } 
  } 
}
