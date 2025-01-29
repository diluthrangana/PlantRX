import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles

const Plants = () => {
  const plants = [
    {
      name: 'Banana',
      image: './assets/plants/Rice.jpg',
      details: {
        soil: 'Well-drained, fertile soil with a pH of 5.5–7.0.',
        sunlight: 'Full sun (6–8 hours daily).',
        watering: 'Regular watering, keeping the soil moist but not waterlogged.',
        spacing: 'Plant 2–3 meters apart to allow growth.',
        harvest: '9–12 months after planting.',
        tips: 'Use mulch to retain soil moisture and control weeds.',
      },
    },
    {
      name: 'Pineapple',
      image: './assets/plants/Pineapple.jpg',
      details: {
        soil: 'Sandy, well-drained soil with a pH of 4.5–6.5.',
        sunlight: 'Full sun (6–8 hours daily).',
        watering: 'Moderate watering; allow soil to dry slightly between waterings.',
        spacing: 'Plant 1 meter apart.',
        harvest: '18–24 months after planting.',
        tips: 'Remove suckers to promote fruit growth.',
      },
    },
    {
      name: 'Papaya',
      image: './assets/plants/Papaya.jpg',
      details: {
        soil: 'Fertile, well-drained soil with a pH of 6.0–6.5.',
        sunlight: 'Full sun (6–8 hours daily).',
        watering: 'Regular watering; avoid waterlogging.',
        spacing: 'Plant 2–3 meters apart.',
        harvest: '6–9 months after planting.',
        tips: 'Plant both male and female trees for pollination.',
      },
    },
    {
      name: 'Brinjal (Eggplant)',
      image: './assets/plants/Brinjal.jpg',
      details: {
        soil: 'Rich, well-drained soil with a pH of 5.5–6.5.',
        sunlight: 'Full sun (6–8 hours daily).',
        watering: 'Consistent watering; keep soil evenly moist.',
        spacing: 'Plant 60–75 cm apart.',
        harvest: '70–85 days after planting.',
        tips: 'Use stakes to support the plants as they grow.',
      },
    },
    {
      name: 'Tomato',
      image: './assets/plants/Tomato.jpg',
      details: {
        soil: 'Nutrient-rich, well-drained soil with a pH of 6.0–7.0.',
        sunlight: 'Full sun (6–8 hours daily).',
        watering: 'Regular watering; avoid wetting the leaves.',
        spacing: 'Plant 60–90 cm apart.',
        harvest: '60–80 days after planting.',
        tips: 'Prune suckers to improve air circulation and fruit yield.',
      },
    },
    {
      name: 'Okra',
      image: './assets/plants/Okra.jpg',
      details: {
        soil: 'Well-drained, fertile soil with a pH of 6.0–6.8.',
        sunlight: 'Full sun (6–8 hours daily).',
        watering: 'Moderate watering; keep soil moist.',
        spacing: 'Plant 30–45 cm apart.',
        harvest: '50–60 days after planting.',
        tips: 'Harvest pods when they are 7–10 cm long for best flavor.',
      },
    },
    {
      name: 'Capsicum (Bell Pepper)',
      image: './assets/plants/Capsicum.jpg',
      details: {
        soil: 'Well-drained, loamy soil with a pH of 6.0–7.0.',
        sunlight: 'Full sun (6–8 hours daily).',
        watering: 'Regular watering; avoid waterlogging.',
        spacing: 'Plant 45–60 cm apart.',
        harvest: '60–90 days after planting.',
        tips: 'Use mulch to maintain soil moisture and temperature.',
      },
    },
    {
      name: 'Pumpkin',
      image: './assets/plants/Pumpkin.jpg',
      details: {
        soil: 'Fertile, well-drained soil with a pH of 6.0–7.5.',
        sunlight: 'Full sun (6–8 hours daily).',
        watering: 'Consistent watering; keep soil moist.',
        spacing: 'Plant 1–2 meters apart.',
        harvest: '90–120 days after planting.',
        tips: 'Train vines to grow in a specific direction to save space.',
      },
    },
    {
      name: 'Bitter Gourd',
      details: {
        soil: 'Well-drained, sandy loam soil with a pH of 6.0–7.0.',
        sunlight: 'Full sun (6–8 hours daily).',
        watering: 'Regular watering; keep soil moist.',
        spacing: 'Plant 45–60 cm apart.',
        harvest: '55–60 days after planting.',
        tips: 'Use trellises to support the vines and improve air circulation.',
      },
    },
    {
      name: 'Snake Gourd',
      details: {
        soil: 'Fertile, well-drained soil with a pH of 6.0–7.0.',
        sunlight: 'Full sun (6–8 hours daily).',
        watering: 'Moderate watering; keep soil moist.',
        spacing: 'Plant 60–90 cm apart.',
        harvest: '60–70 days after planting.',
        tips: 'Harvest gourds when they are young and tender.',
      },
    },
    {
      name: 'Sweet Potato',
      details: {
        soil: 'Loose, well-drained soil with a pH of 5.5–6.5.',
        sunlight: 'Full sun (6–8 hours daily).',
        watering: 'Moderate watering; avoid waterlogging.',
        spacing: 'Plant 30–45 cm apart.',
        harvest: '90–120 days after planting.',
        tips: 'Cure harvested sweet potatoes in a warm, humid place for 10 days.',
      },
    },
    {
      name: 'Cassava',
      details: {
        soil: 'Well-drained, sandy soil with a pH of 5.5–6.5.',
        sunlight: 'Full sun (6–8 hours daily).',
        watering: 'Minimal watering; drought-tolerant.',
        spacing: 'Plant 1 meter apart.',
        harvest: '8–12 months after planting.',
        tips: 'Remove lower leaves to encourage tuber growth.',
      },
    },
    {
      name: 'Potato',
      details: {
        soil: 'Loose, well-drained soil with a pH of 5.0–6.0.',
        sunlight: 'Full sun (6–8 hours daily).',
        watering: 'Consistent watering; keep soil moist.',
        spacing: 'Plant 30–45 cm apart.',
        harvest: '70–120 days after planting.',
        tips: 'Hill soil around the base of plants to protect tubers from sunlight.',
      },
    },
    {
      name: 'Yams',
      details: {
        soil: 'Fertile, well-drained soil with a pH of 5.5–6.5.',
        sunlight: 'Full sun (6–8 hours daily).',
        watering: 'Regular watering; keep soil moist.',
        spacing: 'Plant 1 meter apart.',
        harvest: '8–10 months after planting.',
        tips: 'Use stakes or trellises to support the vines.',
      },
    },
    {
      name: 'Rice',
      details: {
        soil: 'Flooded paddy fields with a pH of 6.0–7.0.',
        sunlight: 'Full sun (6–8 hours daily).',
        watering: 'Consistent water supply; keep fields flooded.',
        spacing: 'Plant 15–20 cm apart.',
        harvest: '3–6 months after planting.',
        tips: 'Use nitrogen-rich fertilizers for higher yields.',
      },
    },
    {
      name: 'Maize (Corn)',
      details: {
        soil: 'Well-drained, fertile soil with a pH of 5.8–7.0.',
        sunlight: 'Full sun (6–8 hours daily).',
        watering: 'Regular watering; keep soil moist.',
        spacing: 'Plant 20–30 cm apart.',
        harvest: '60–100 days after planting.',
        tips: 'Plant in blocks for better pollination.',
      },
    },
  ];

  return (
    <div style={styles.container}>
      <Carousel
        showArrows={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        interval={2000}
      >
        {plants.map((plant, index) => (
          <div key={index} style={styles.carouselItem}>
            <div style={{ ...styles.image, backgroundImage: `url(${plant.image})` }}>
              <div style={styles.overlay}>
                <h2 style={styles.plantName}>{plant.name}</h2>
                <div style={styles.detailsContainer}>
                  <p style={styles.detail}><strong>Soil:</strong> {plant.details.soil}</p>
                  <p style={styles.detail}><strong>Sunlight:</strong> {plant.details.sunlight}</p>
                  <p style={styles.detail}><strong>Watering:</strong> {plant.details.watering}</p>
                  <p style={styles.detail}><strong>Spacing:</strong> {plant.details.spacing}</p>
                  <p style={styles.detail}><strong>Harvest Time:</strong> {plant.details.harvest}</p>
                  <p style={styles.detail}><strong>Tips:</strong> {plant.details.tips}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    paddingTop: "100px", // Add top padding to prevent overlap with the navbar
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    width: "75%", // Set the width to 75%
    position: "absolute", // Position it absolutely
    left: "0", // Position it on the left side
    top: "0",
    bottom: "0",
    marginLeft: "0", // Ensure no margin to the left
  },
  heading: {
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  carouselItem: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: "500px", // Ensure the image takes full width and a fixed height
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "15px",
  },
  overlay: {
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "100%",
    height: "75%", // Make sure the overlay is the same height as the image
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Semi-transparent black background
    color: "white",
    padding: "20px",
    textAlign: "left",
    borderRadius: "15px",
  },
  plantName: {
    fontSize: "30px",
    fontWeight: "bold",
    marginBottom: "10px",
    marginLeft: "30px",
  },
  detailsContainer: {
    marginTop: "10px",
    marginLeft: "30px",
  },
  detail: {
    fontSize: "18px",
    margin: "5px 0",
  },
};

export default Plants;