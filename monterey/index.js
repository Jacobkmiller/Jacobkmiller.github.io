import { destinations } from './destinations.js'
import { styles } from './styles.js'

let map

const generalIcons = {
  Lodging: 'https://images.vexels.com/media/users/3/157343/isolated/preview/fa058a304813b6d204d29253f5cb90d4-flat-home-house-icon-by-vexels.png'
}

const markers = []

const initMap = () => {
  const windowHeight = document.body.clientHeight
  const mapDiv = document.getElementById('map')
  mapDiv.style.height = windowHeight - 50 + 'px'

  map = new google.maps.Map(
    mapDiv, {
      center: new google.maps.LatLng(36.800741, -121.947311),
      zoom: 10.3,
      gestureHandling: 'greedy',
      styles: styles
    }
  )

  const categoriesMap = drawDestinations(destinations)

  const navUl = document.getElementById('nav-ul')
  Object.keys(categoriesMap).forEach((category) => {
    navUl.innerHTML += `
      <li class="nav-item">
        <a id="nav-link-${category}" class="nav-link" href="#">${category}</a>
      </li>
    `
  })
  Object.keys(categoriesMap).forEach((category) => {
    const link = document.getElementById(`nav-link-${category}`)
    link.onclick = () => {
      filterDestinations(category)
    }
  })
}

const filterDestinations = (category) => {
  markers.forEach((marker) => {
    marker.setMap(null)
  })

  if (category === 'All') {
    drawDestinations(destinations)
  } else {
    drawDestinations(destinations.filter(destination => destination.category === category))
  }
}

const drawDestinations = (destinations) => {
  const categoriesMap = { All: 1 }
  // Create markers.
  destinations.forEach((destination) => {
    categoriesMap[destination.category] = 1
    const contentString = `
      <div id="content" style="width: 100%; max-width: 200px;">
        <h1 id="firstHeading" style="display:block; margin:auto; text-align:center;">${destination.name}</h1>
        <div id="bodyContent">
          <img src="${destination.image}" style="width: 80%; display: block; margin: auto;"></img>
          <p>Description: ${destination.description}</p>
          <p>${destination.checkIn ? 'Check In: ' + destination.checkIn : ''}</p>
          <p>${destination.checkOut ? 'Check Out: ' + destination.checkOut : ''}</p>
          <p>Address: ${destination.address}</p>
        </div>
      </div>
    `

    const infowindow = new google.maps.InfoWindow({
      content: contentString
    })

    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(destination.lat, destination.lng),
      icon: {
        url: destination.icon || generalIcons[destination.category],
        scaledSize: new google.maps.Size(50, 50)
      },
      map: map,
      title: destination.name
    })
    marker.category = destination.category

    marker.addListener('click', function () {
      infowindow.open(map, marker)
      google.maps.event.addListener(map, 'click', function (event) {
        infowindow.close()
      })
    })
    // marker.addListener('mouseout', function () {
    //   infowindow.close(map, marker);
    // });

    markers.push(marker)
  })

  return categoriesMap
}

initMap()
