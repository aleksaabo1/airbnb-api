import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import webpush from 'web-push';
import bodyParser from 'body-parser';
const app = express();
const PORT = 3001;


app.use(cors());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, '../src/public/images')));
app.use('/converted_images', express.static('../src/public/converted_images'));

app.use(bodyParser.json());

interface ImageUrls {
    [key: string]: string[];
}

const imageUrls: ImageUrls = {
    0: ['https://a0.muscache.com/im/pictures/e25a9b25-fa98-4160-bfd1-039287bf38b6.jpg?im_w=960',
    'https://a0.muscache.com/im/pictures/miso/Hosting-34113796/original/f4f7b242-db33-46fc-9080-c3d6a6fd55ec.jpeg?im_w=1200',
        'https://a0.muscache.com/im/pictures/miso/Hosting-34113796/original/372e7d6f-7fb9-4668-92f0-25bb9a346814.jpeg?im_w=1200',
        'https://a0.muscache.com/im/pictures/miso/Hosting-34113796/original/4756e699-f474-4ca7-8b77-06b12715a6cb.jpeg?im_w=1200',
        'https://a0.muscache.com/im/pictures/miso/Hosting-34113796/original/fca892a4-3481-4ad1-9f92-404feaa42e9f.jpeg?im_w=1200',
        'https://a0.muscache.com/im/pictures/miso/Hosting-34113796/original/36d8007a-0de5-439d-9fec-1c2d7b53a147.jpeg?im_w=1200'],
    1: ['https://a0.muscache.com/im/pictures/miso/Hosting-48748370/original/1e882ee5-9c12-4968-99d2-67bf7760a072.jpeg?im_w=960',
        'https://a0.muscache.com/im/pictures/miso/Hosting-48748370/original/0ed36ed9-0014-4414-a163-103c8d5f52e8.jpeg?im_w=1200',
        'https://a0.muscache.com/im/pictures/miso/Hosting-48748370/original/d8e811b3-1542-4fd3-92fc-b045becc39ea.jpeg?im_w=1200',
        'https://a0.muscache.com/im/pictures/miso/Hosting-48748370/original/e8daf8a4-7f35-4aa3-8975-49a08254eb15.jpeg?im_w=1200',
        'https://a0.muscache.com/im/pictures/miso/Hosting-48748370/original/307c352c-4941-40b1-9b82-a85b5f2fad47.jpeg?im_w=1200',
        'https://a0.muscache.com/im/pictures/miso/Hosting-48748370/original/184d4086-315d-4b4b-9c2a-e1b93ac27a04.jpeg?im_w=1200'],
    2: ['https://a0.muscache.com/im/pictures/44f2324f-1387-421d-936b-c367760530ef.jpg?im_w=960',
        'https://a0.muscache.com/im/pictures/miso/Hosting-24873113/original/3561f3cb-2b47-4aad-bb82-ecd2a93c5add.jpeg?im_w=1200',
        'https://a0.muscache.com/im/pictures/a2babc30-3a13-4cc2-a8d9-7036d8c5bad1.jpg?im_w=1200',
        'https://a0.muscache.com/im/pictures/41373ffc-25a2-4f7f-87fd-38dcb9220b84.jpg?im_w=1200',
        'https://a0.muscache.com/im/pictures/8bb70f74-c6b4-4c7a-8d10-62a5656aab11.jpg?im_w=1200',
        'https://a0.muscache.com/im/pictures/53723650-6356-472c-90cb-8900672db48b.jpg?im_w=1200'],
    3: ['https://a0.muscache.com/im/pictures/miso/Hosting-45051304/original/dc8ae9e2-b071-4323-9f87-0df718222e08.jpeg?im_w=960',
        'https://a0.muscache.com/im/pictures/miso/Hosting-45051304/original/482d0da5-502d-46b7-853b-687c56bc3e99.jpeg?im_w=1200',
        'https://a0.muscache.com/im/pictures/miso/Hosting-45051304/original/9d07887f-944c-4d23-a2c9-570984d9c977.jpeg?im_w=1200',
        'https://a0.muscache.com/im/pictures/miso/Hosting-45051304/original/f7994e20-9632-49ac-80fd-06db2fc9b525.jpeg?im_w=1200',
        'https://a0.muscache.com/im/pictures/miso/Hosting-45051304/original/3374be12-966b-4e51-96e6-f9d40c1dbe31.jpeg?im_w=1200',
        'https://a0.muscache.com/im/pictures/miso/Hosting-45051304/original/2417b47b-d844-43ba-87e0-5bf311c5568c.jpeg?im_w=1200'],
    4: ['https://a0.muscache.com/im/pictures/3be00685-2656-4ae6-b185-3aeb02222c7c.jpg?im_w=960',
        'https://a0.muscache.com/im/pictures/36dca56a-091f-4d0c-a7e8-f41bbcb168d0.jpg?im_w=1200',
        'https://a0.muscache.com/im/pictures/7f0e7ee0-70a7-41fd-9016-5636bd5f5d2b.jpg?im_w=1200',
        'https://a0.muscache.com/im/pictures/4474dcf6-5f07-4c3f-bded-fe18e01dd883.jpg?im_w=1200',
        'https://a0.muscache.com/im/pictures/f9bad27c-cf92-4a86-9077-b69e8026c313.jpg?im_w=1200',
        'https://a0.muscache.com/im/pictures/9f6851e7-9b6a-4847-99ae-4d3765cde350.jpg?im_w=1200'],
    5: ['https://a0.muscache.com/im/pictures/miso/Hosting-45932283/original/ed2588b1-73f0-4ee7-80c1-cf52a3254f62.jpeg?im_w=960',
        'https://a0.muscache.com/im/pictures/0cd51607-821d-4827-aca9-40e4c0d46604.jpg?im_w=1200',
        'https://a0.muscache.com/im/pictures/4b70db58-1343-4dc5-b7f8-980f8a17623f.jpg?im_w=1200',
        'https://a0.muscache.com/im/pictures/dbffbc58-6838-473c-bd05-fd12faaa0345.jpg?im_w=1200',
        'https://a0.muscache.com/im/pictures/a5629f72-3181-4238-a5c6-e46f194b979b.jpg?im_w=1200',
        'https://a0.muscache.com/im/pictures/0f94508d-567b-4a93-a57e-6ef980a43c4d.jpg?im_w=1200'],
    6: ['https://a0.muscache.com/im/pictures/miso/Hosting-5264493/original/10d2c21f-84c2-46c5-b20b-b51d1c2c971a.jpeg?im_w=960',
        'https://a0.muscache.com/im/pictures/miso/Hosting-5264493/original/e3beaf52-13ab-44ed-bbfa-56ccf43bab98.jpeg?im_w=1200',
        'https://a0.muscache.com/im/pictures/miso/Hosting-5264493/original/858b29eb-53f3-4707-87a6-444f4375f888.jpeg?im_w=1200',
        'https://a0.muscache.com/im/pictures/miso/Hosting-5264493/original/def4a486-26a6-4555-8c05-4736a4ca262b.jpeg?im_w=1200',
        'https://a0.muscache.com/im/pictures/miso/Hosting-5264493/original/d0a3e3b1-6d38-426d-8779-1ec5c8fbe30e.jpeg?im_w=1200',
        'https://a0.muscache.com/im/pictures/miso/Hosting-5264493/original/8167c651-88dd-446c-93ca-4e08b7ba0b5d.jpeg?im_w=1200'],
    7: ['https://a0.muscache.com/im/pictures/miso/Hosting-20952140/original/d6380b74-9bb6-4821-88a7-422d1b494791.jpeg?im_w=960',
        'https://a0.muscache.com/im/pictures/93aba728-fe1e-4590-a068-a2abecedb88b.jpg?im_w=1200',
        'https://a0.muscache.com/im/pictures/f352286f-8b93-40d5-99c2-dcd7a5b763c2.jpg?im_w=1200',
        'https://a0.muscache.com/im/pictures/9ed951f2-dd9b-4283-8d31-09f204da83e6.jpg?im_w=1200',
        'https://a0.muscache.com/im/pictures/42118d23-fe51-47c5-9cf1-e659ad621cf0.jpg?im_w=1200',
        'https://a0.muscache.com/im/pictures/b8831b56-2d09-4edb-bffc-fe5c77289a0d.jpg?im_w=1200'],
    8: ['https://a0.muscache.com/im/pictures/2e5550b5-628f-46a6-ae3b-93495384c15e.jpg?im_w=960',
        'https://a0.muscache.com/im/pictures/3a6a8b43-770d-4d1a-abc5-a98ecdbecbc8.jpg?im_w=1200',
        'https://a0.muscache.com/im/pictures/6778839c-5d59-4151-879f-7c9f9fa1665d.jpg?im_w=1200',
        'https://a0.muscache.com/im/pictures/b87deeeb-948c-4797-a6bd-570e38ee7e7d.jpg?im_w=1200',
        'https://a0.muscache.com/im/pictures/ce00c473-3f97-4e06-879e-a4b812d411ba.jpg?im_w=1200',
        'https://a0.muscache.com/im/pictures/7a135924-86c3-4141-8ba5-dbfa04a80fda.jpg?im_w=1200'],
    9: ['https://a0.muscache.com/im/pictures/a70fb4c3-f419-48bf-b7f1-945b586077bf.jpg?im_w=960',
        'https://a0.muscache.com/im/pictures/miso/Hosting-42227515/original/81237e10-276c-4718-8771-9b43c9cb84c0.jpeg?im_w=1200',
        'https://a0.muscache.com/im/pictures/miso/Hosting-42227515/original/d9355b2d-8cbb-40f4-8c6a-f6c0f7013234.jpeg?im_w=1200',
        'https://a0.muscache.com/im/pictures/miso/Hosting-42227515/original/f3d6e402-d449-493d-95b3-5400c7a545b2.jpeg?im_w=1200',
        'https://a0.muscache.com/im/pictures/miso/Hosting-42227515/original/617598a3-8aa2-4759-a0b5-2879d9c65997.jpeg?im_w=1200',
        'https://a0.muscache.com/im/pictures/f941fc6c-294d-4ed9-a3c8-cb43d661da43.jpg?im_w=1200'],
};


app.get('/images/:house_id/jpg', (req, res) => {
    const houseId = parseInt(req.params.house_id);
    if (imageUrls[houseId]) {
        res.json(imageUrls[houseId]);
    } else {
        res.status(404).json({ message: "Images not found for this house" });
    }
});

app.get('/images/:house_id', (req: Request, res: Response) => {
    const houseId = parseInt(req.params.house_id);
    if (imageUrls[houseId]) {
        const localUrls = imageUrls[houseId].map(url => {
            if (url) {
                const filename = url.split('/').pop()?.split('?')[0];
                if (filename) {
                    const filenameWithoutExtension = filename.split('.')[0];
                    return `http://${req.headers.host}/public/converted_images/${houseId}/${filenameWithoutExtension}.webp`;
                }
            }
            return undefined;
        }).filter(url => url !== undefined); // Filter out undefined URLs

        res.json(localUrls);
    } else {
        res.status(404).json({ message: "Images not found for this house" });
    }
});



// Utility function to get random location
function getRandomLocation() {
    const locations = [
        'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
        'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
        'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte',
        'San Francisco', 'Indianapolis', 'Seattle', 'Denver', 'Washington',
        'Boston', 'El Paso', 'Detroit', 'Nashville', 'Portland',
        'Memphis', 'Oklahoma City', 'Las Vegas', 'Louisville', 'Baltimore',
        'Milwaukee', 'Albuquerque', 'Tucson', 'Fresno', 'Sacramento',
        'Mesa', 'Kansas City', 'Atlanta', 'Long Beach', 'Colorado Springs',
        'Raleigh', 'Miami', 'Virginia Beach', 'Omaha', 'Oakland',
        'Minneapolis', 'Tulsa', 'Arlington', 'New Orleans', 'Wichita'
    ];
    return locations[Math.floor(Math.random() * locations.length)];
}

// Utility function to get a random double value within a range
function getRandomDouble(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomImage(id: number): string | null {
    const urls = imageUrls[id];
    if (urls && urls.length > 0) {
        // Assuming your server host and port are constant, replace with actual values
        const serverHost = 'https://bj2ymyvrfp.eu-west-2.awsapprunner.com';
        const firstImageUrl = urls[0]; // Get the first image URL
        const filename = firstImageUrl.split('/').pop()?.split('?')[0];
        if (filename) {
            const filenameWithoutExtension = filename.split('.')[0];
            return `${serverHost}/public/converted_images/${id}/${filenameWithoutExtension}.webp`;
        }
    }
    return null;
}

// Generate a list of items (representing pages of data)
function generateItems(page: number, pageSize: number) {
    const items = [];
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    for (let i = start; i < end; i++) {
        items.push({
            id: i,
            imageUrl: getRandomImage(i),
            location: getRandomLocation(),
            price: getRandomDouble(50000, 500000),
            bedrooms: Math.ceil(getRandomDouble(1, 5)),
            baths: Math.ceil(getRandomDouble(1, 3)),
        });
    }

    return items;
}


// Constant for the number of items per page
const PAGE_SIZE = 10;

app.get('/items', (req: Request, res: Response) => {
    // Get the page number from query parameters or default to 1

    const page = parseInt(req.query.page as string) || 1;

    // Call the function to generate the items for this page
    const items = generateItems(page, PAGE_SIZE);

    // Respond with the items as JSON
    res.json(items);
});




const descriptionRentals = [
    {
        "id": 0,
        "title": "Cozy Mountain Cabin",
        "guests": 6,
        "bedrooms": 3,
        "beds": 3,
        "baths": 2,
        "description": "Nestled in the heart of the mountains, this cabin offers a serene getaway with breathtaking views. Equipped with a modern kitchen, cozy fireplace, and a deck overlooking the forest."
    },
    {
        "id": 1,
        "title": "Beachfront Villa",
        "guests": 8,
        "bedrooms": 4,
        "beds": 5,
        "baths": 3,
        "description": "A luxurious beachfront villa with private access to the beach. Features include an infinity pool, spacious sun deck, and an open-plan living area with stunning sea views."
    },    {
        "id": 2,
        "title": "Urban Artistic Loft",
        "guests": 4,
        "bedrooms": 1,
        "beds": 2,
        "baths": 1,
        "description": "Experience city living in this stylish loft, adorned with contemporary art. Features a fully equipped kitchen, a cozy reading nook, and a balcony with urban views."
    },
    {
        "id": 3,
        "title": "Tranquil Lakeside Retreat",
        "guests": 5,
        "bedrooms": 2,
        "beds": 3,
        "baths": 2,
        "description": "Escape to a peaceful lakeside retreat with a private dock. Enjoy a spacious deck, an outdoor grill, and stunning sunset views over the lake."
    },
    {
        "id": 4,
        "title": "Charming Countryside Cottage",
        "guests": 6,
        "bedrooms": 3,
        "beds": 4,
        "baths": 2,
        "description": "A cozy cottage in the countryside, surrounded by nature. Features a stone fireplace, a country-style kitchen, and a lovely garden with a gazebo."
    },
    {
        "id": 5,
        "title": "Modern Downtown Condo",
        "guests": 2,
        "bedrooms": 1,
        "beds": 1,
        "baths": 1,
        "description": "Stay in the heart of the city in this modern condo, offering a sleek design, high-end appliances, and quick access to downtown attractions."
    },
    {
        "id": 6,
        "title": "Secluded Alpine Chalet",
        "guests": 8,
        "bedrooms": 4,
        "beds": 5,
        "baths": 3,
        "description": "A secluded chalet in the alpine region, perfect for ski enthusiasts. Offers a hot tub, a cozy fireplace, and stunning mountain views."
    },
    {
        "id": 7,
        "title": "Luxury Oceanfront Penthouse",
        "guests": 4,
        "bedrooms": 2,
        "beds": 2,
        "baths": 2,
        "description": "Indulge in luxury in this oceanfront penthouse with panoramic sea views. Features a private balcony, a gourmet kitchen, and elegant décor."
    },
    {
        "id": 8,
        "title": "Rustic Hilltop Villa",
        "guests": 7,
        "bedrooms": 3,
        "beds": 4,
        "baths": 2,
        "description": "Enjoy breathtaking views from this hilltop villa, featuring a private pool, an outdoor dining area, and a traditional rustic design."
    },
    {
        "id": 9,
        "title": "Contemporary City Studio",
        "guests": 2,
        "bedrooms": 1,
        "beds": 1,
        "baths": 1,
        "description": "A stylish studio in the city center, perfect for exploring urban life. Boasts modern amenities, a compact layout, and easy access to public transport."
    },
    {
        "id": 10,
        "title": "Tropical Beach Bungalow",
        "guests": 5,
        "bedrooms": 2,
        "beds": 3,
        "baths": 1,
        "description": "A charming bungalow steps away from the beach. Features a tropical garden, an outdoor shower, and a cozy porch with ocean breezes."
    },
    {
        "id": 11,
        "title": "Historic City Center Apartment",
        "guests": 4,
        "bedrooms": 2,
        "beds": 2,
        "baths": 2,
        "description": "Stay in a piece of history with this beautifully restored apartment in the city center. Close to historical landmarks and bustling markets."
    }
]




// Endpoint to get a single rental by ID
app.get('/rentals/description/:id', (req, res) => {
    const rentalId = parseInt(req.params.id);

    // Find the rental with the matching ID
    const rental = descriptionRentals.find(rental => rental.id === rentalId);

    // Check if the rental was found
    if (!rental) {
        res.status(404).send('Rental not found');
        return;
    }

    // Send the found rental
    res.json(rental);

});


const bedrooms =
    [
        {
            "id": 0,
            "bedConfiguration": [
                {"roomNr": 1, "singleBed": 0, "doubleBed": 1},
                {"roomNr": 2, "singleBed": 1, "doubleBed": 1},
                {"roomNr": 3, "singleBed": 0, "doubleBed": 1}
            ]
        },
        {
            "id": 1,
            "bedConfiguration": [
                {"roomNr": 1, "singleBed": 0, "doubleBed": 1},
                {"roomNr": 2, "singleBed": 0, "doubleBed": 1},
                {"roomNr": 3, "singleBed": 1, "doubleBed": 1},
                {"roomNr": 4, "singleBed": 1, "doubleBed": 0}
            ]
        },
        {
            "id": 2,
            "bedConfiguration": [
                {"roomNr": 1, "singleBed": 1, "doubleBed": 1}
            ]
        },
        {
            "id": 3,
            "bedConfiguration": [
                {"roomNr": 1, "singleBed": 1, "doubleBed": 1},
                {"roomNr": 2, "singleBed": 1, "doubleBed": 0}
            ]
        },
        {
            "id": 4,
            "bedConfiguration": [
                {"roomNr": 1, "singleBed": 1, "doubleBed": 1},
                {"roomNr": 2, "singleBed": 1, "doubleBed": 0},
                {"roomNr": 3, "singleBed": 1, "doubleBed": 0}
            ]
        },
        {
            "id": 5,
            "bedConfiguration": [
                {"roomNr": 1, "singleBed": 0, "doubleBed": 1}
            ]
        },
        {
            "id": 6,
            "bedConfiguration": [
                {"roomNr": 1, "singleBed": 1, "doubleBed": 1},
                {"roomNr": 2, "singleBed": 0, "doubleBed": 1},
                {"roomNr": 3, "singleBed": 0, "doubleBed": 1},
                {"roomNr": 4, "singleBed": 1, "doubleBed": 0}
            ]
        },
        {
            "id": 7,
            "bedConfiguration": [
                {"roomNr": 1, "singleBed": 0, "doubleBed": 1},
                {"roomNr": 2, "singleBed": 0, "doubleBed": 1}
            ]
        },
        {
            "id": 8,
            "bedConfiguration": [
                {"roomNr": 1, "singleBed": 1, "doubleBed": 1},
                {"roomNr": 2, "singleBed": 1, "doubleBed": 0},
                {"roomNr": 3, "singleBed": 1, "doubleBed": 0}
            ]
        },
        {
            "id": 9,
            "bedConfiguration": [
                {"roomNr": 1, "singleBed": 0, "doubleBed": 1}
            ]
        },
        {
            "id": 10,
            "bedConfiguration": [
                {"roomNr": 1, "singleBed": 1, "doubleBed": 1},
                {"roomNr": 2, "singleBed": 1, "doubleBed": 0}
            ]
        },
        {
            "id": 11,
            "bedConfiguration": [
                {"roomNr": 1, "singleBed": 0, "doubleBed": 1},
                {"roomNr": 2, "singleBed": 0, "doubleBed": 1}
            ]
        }
    ]

// Endpoint to get a single rental by ID
app.get('/rentals/bedrooms/:id', (req, res) => {
    const rentalId = parseInt(req.params.id);

    // Find the rental with the matching ID
    const rental = bedrooms.find(rental => rental.id === rentalId);

    // Check if the rental was found
    if (!rental) {
        res.status(404).send('Rental not found');
        return;
    }
    // Send the found rental
    res.json(rental);

});



const ratings = [
    {
        "username": "EmmaJ",
        "rating": 5,
        "text": "Amazing experience! The location was breathtaking and the host was incredibly welcoming. Definitely coming back next year!"
    },
    {
        "username": "TravelLover92",
        "rating": 4,
        "text": "Lovely place with stunning views. The host was very accommodating. Only wish we could have stayed longer."
    },
    {
        "username": "NatureEnthusiast",
        "rating": 5,
        "text": "A perfect escape into nature. The cabin was cozy and the surroundings were just what I needed to unwind."
    },
    {
        "username": "CityBreaker",
        "rating": 4,
        "text": "A delightful break from city life. The tranquility here is unmatched. Highly recommended!"
    },
    {
        "username": "Adventurer_2023",
        "rating": 4.5,
        "text": "An adventurer's paradise! Great trails nearby and the cabin had all the amenities for a comfortable stay."
    },
    {
        "username": "SolitudeSeeker",
        "rating": 5,
        "text": "This place is a gem for anyone seeking solitude and peace. The host respects your privacy but is always there when needed."
    },
    {
        "username": "HappyHiker",
        "rating": 5,
        "text": "Loved every moment here! The hiking paths were fantastic and the cabin was a dream to stay in."
    },
    {
        "username": "Wanderlust_Will",
        "rating": 3.5,
        "text": "Nice location, but the cabin could use some upgrades. The host was very friendly and helpful though."
    },
    {
        "username": "TranquilTraveller",
        "rating": 4,
        "text": "A tranquil retreat - just what I needed. The surroundings are serene and the cabin is quite cozy."
    },
    {
        "username": "LakesideLover",
        "rating": 5,
        "text": "The lakeside view is to die for! Spent my evenings just soaking in the beauty. Will return for sure."
    },
    {
        "username": "PeacefulPat",
        "rating": 4,
        "text": "A peaceful and quiet getaway. The perfect place to disconnect and recharge."
    },
    {
        "username": "SereneSally",
        "rating": 4.5,
        "text": "Absolutely serene and beautiful. The host's hospitality made it even more special."
    },
    {
        "username": "ExplorerEric",
        "rating": 5,
        "text": "A true explorer's delight. Lots of areas to discover around the cabin and the accommodations were top-notch."
    },
    {
        "username": "CozyCabinFan",
        "rating": 4.5,
        "text": "The cabin was the epitome of coziness. Loved the warm fireplace and the rustic decor. A perfect weekend getaway!"
    },
    {
        "username": "OutdoorAdventures",
        "rating": 5,
        "text": "Great spot for outdoor enthusiasts. The nearby trails were incredible and the cabin was a cozy place to return to after a day of exploring."
    },
    {
        "username": "QuietRetreat",
        "rating": 4,
        "text": "If you're looking for a quiet retreat, this is the place. Surrounded by nature, it's a great spot to unwind and relax."
    },
    {
        "username": "FamilyVacationer",
        "rating": 4.5,
        "text": "Our family had a fantastic time! The kids loved exploring the area and we all appreciated the comfort of the cabin."
    },
    {
        "username": "SoloTraveler",
        "rating": 4.5,
        "text": "As a solo traveler, I felt safe and welcomed. The host was accommodating and the cabin had everything I needed for a peaceful stay."
    },
    {
        "username": "NatureLover",
        "rating": 5,
        "text": "This cabin is a nature lover's dream. Waking up to the sounds of the forest and the beautiful scenery was just magical."
    },
    {
        "username": "WeekendHiker",
        "rating": 4,
        "text": "Perfect base for weekend hiking trips. The cabin was comfortable and the host provided great tips on local trails."
    },
    {
        "username": "RetreatSeeker",
        "rating": 5,
        "text": "I was looking for a retreat from my busy life, and this cabin was perfect. Tranquil, beautiful, and just what I needed to recharge."
    },
    {
        "username": "BirdWatcher",
        "rating": 5,
        "text": "A paradise for bird watchers. The variety of birds in the area was incredible, and the cabin's porch was the perfect spot to observe them."
    },
    {
        "username": "StarGazer",
        "rating": 4.5,
        "text": "The night sky here is breathtaking. Laying under the stars at this cabin was an unforgettable experience."
    },
    {
        "username": "FreshAirFanatic",
        "rating": 4,
        "text": "Breathing in the fresh mountain air while staying at this cabin was so rejuvenating. A lovely escape from city life."
    },
    {
        "username": "ForestFrequenter",
        "rating": 5,
        "text": "Staying in the heart of the forest was incredible. The cabin is well-maintained and the host was super helpful."
    },
    {
        "username": "RusticRelaxer",
        "rating": 4.5,
        "text": "The rustic charm of this cabin is unbeatable. It's cozy, well-equipped, and in a stunning location."
    },
    {
        "username": "LakesideDreamer",
        "rating": 5,
        "text": "Waking up to the lake view was a dream come true. The cabin and its location are just perfect for a peaceful getaway."
    },
    {
        "username": "HikingHub",
        "rating": 4.5,
        "text": "This cabin was the perfect hiking hub for our group. Comfortable, convenient, and surrounded by nature."
    }
]


// Endpoint to get a single rental by ID
app.get('/rentals/reviews/:id', (req, res) => {
    const rentalId = parseInt(req.params.id);

    // Generate a random number of reviews (between 1 and 9)
    const numberOfReviews = Math.floor(Math.random() * 9) + 1;
    const selectedReviews = [];

    for (let i = 0; i < numberOfReviews; i++) {
        // Randomly select a review and add it to the selectedReviews array
        const randomIndex = Math.floor(Math.random() * ratings.length);
        selectedReviews.push(ratings[randomIndex]);
    }

    // Send the selected reviews
    res.json(selectedReviews);
});


const hosts = [
    {
        "hostName": "John Doe",
        "joinedIn": "May 2020",
        "description": "Passionate about providing exceptional stays for all guests. Loves hiking and outdoor activities.",
        "responseRate": "100%",
        "responseTime": "within an hour",
        "language": "English, Spanish"
    },
    {
        "hostName": "Emily Smith",
        "joinedIn": "June 2019",
        "description": "Enjoys sharing local knowledge and making sure guests have a memorable visit. Avid reader and history enthusiast.",
        "responseRate": "98%",
        "responseTime": "within a few hours",
        "language": "English, French"
    },
    {
        "hostName": "Carlos Hernandez",
        "joinedIn": "April 2018",
        "description": "Dedicated to offering cozy and unique accommodations. Loves cooking and soccer.",
        "responseRate": "95%",
        "responseTime": "within a day",
        "language": "Spanish, Portuguese"
    },
    {
        "hostName": "Anna Kowalski",
        "joinedIn": "March 2021",
        "description": "Committed to creating a welcoming and comfortable environment. Enjoys gardening and painting.",
        "responseRate": "100%",
        "responseTime": "within an hour",
        "language": "Polish, English"
    },
    {
        "hostName": "Mark Lee",
        "joinedIn": "July 2017",
        "description": "Loves to provide a home away from home for travelers. Keen cyclist and photographer.",
        "responseRate": "97%",
        "responseTime": "within two hours",
        "language": "English, Mandarin"
    },
    {
        "hostName": "Sophie Martin",
        "joinedIn": "August 2020",
        "description": "Focuses on ensuring a relaxing and enjoyable stay. Interested in yoga and sustainable living.",
        "responseRate": "99%",
        "responseTime": "within three hours",
        "language": "French, English"
    },
    {
        "hostName": "Ali Yilmaz",
        "joinedIn": "December 2019",
        "description": "Aims to provide an authentic and comfortable experience. Loves exploring new cultures and cuisines.",
        "responseRate": "96%",
        "responseTime": "within half a day",
        "language": "Turkish, English"
    },
    {
        "hostName": "Rachel Green",
        "joinedIn": "February 2022",
        "description": "Ensures a warm and inviting stay for all guests. Passionate about music and arts.",
        "responseRate": "100%",
        "responseTime": "within an hour",
        "language": "English, Italian"
    },
    {
        "hostName": "Lars Svensson",
        "joinedIn": "October 2018",
        "description": "Strives to offer a peaceful and unique stay. Enjoys skiing and mountain biking.",
        "responseRate": "93%",
        "responseTime": "within a day",
        "language": "Swedish, English"
    },
    {
        "hostName": "Fiona Cheng",
        "joinedIn": "January 2020",
        "description": "Dedicated to providing a luxurious and comfortable experience. Interested in fashion and design.",
        "responseRate": "98%",
        "responseTime": "within a few hours",
        "language": "Mandarin, English"
    }
]


app.get('/rentals/hosts/:id', (req, res) => {
    const rentalId = parseInt(req.params.id);

    // Find the rental with the matching ID
    const host = hosts.find((rental, index) => index === (rentalId % 10));

    // Check if the rental was found
    if (!host) {
        res.status(404).send('Rental not found');
        return;
    }
    // Send the found rental
    res.json(host);

});




function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    try {
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    } catch (e) {
        console.error('Failed to convert VAPID key:', e);
        throw e;
    }
}



const vapidKeys = {
    publicKey: "BFy7ElYdavR1v6_bDhsuanTW6RB7uapIXdrNBWCQXPbGLFgDeV59kOr8FEZR_p378h-KgpDU1GmQMRn94wPn9ZI",
    privateKey: "aa4oXamg62mcaF6YyptRupdXemi4sTzNBOR6bjegPM4"
};

webpush.setVapidDetails(
    'mailto:clietorres3@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

interface PushSubscription {
    endpoint: string;
    keys: {
        auth: string;
        p256dh: string;
    };
}

const subscriptions: PushSubscription[] = [];

app.post('/api/subscribe', (req, res) => {
    const subscription: PushSubscription = req.body;
    subscriptions.push(subscription);
    console.log(subscriptions);
    res.status(200).json({ message: 'Subscription added successfully.' });
});

app.post('/api/notify', async (req, res) => {
    const notificationPayload = JSON.stringify({
        title: 'Reminder of Booking',
        body: 'This is a reminder of your booking at Beachfront Villa on december 1st to december 7th',
        icon: 'https://bj2ymyvrfp.eu-west-2.awsapprunner.com/images/airbnb-logo.png',
        data: {
            url: 'url_to_open_on_click'
        }
    });


    const sendNotificationPromises = subscriptions.map(subscription =>
        webpush.sendNotification(subscription, notificationPayload).catch(err => {
            console.error('Error sending notification:', err);
            return err;
        })
    );

    try {
        await Promise.all(sendNotificationPromises);
        res.status(200).json({ message: 'Notifications sent successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send some notifications', details: error });
    }
});



app.post('/api/notify/booking', async (req, res) => {
    const { startDate, endDate } = req.body; // Assuming these are provided in the request body

    // Format the dates as needed
    const formattedStartDate = startDate.slice(5, 10).replace('-', '/');
    const formattedEndDate = endDate.slice(5, 10).replace('-', '/');

    const notificationPayload = JSON.stringify({
        title: 'Booking Confirmation',
        body: `Your booking has been confirmed. We look forward to seeing you on ${formattedStartDate} to ${formattedEndDate}`,
        icon: 'https://bj2ymyvrfp.eu-west-2.awsapprunner.com/images/airbnb-logo.png',
        data: {
            url: req.body.url
        }
    });

    const sendNotificationPromises = subscriptions.map(subscription =>
        webpush.sendNotification(subscription, notificationPayload).catch(err => {
            console.error('Error sending notification:', err);
            return err;
        })
    );

    try {
        await Promise.all(sendNotificationPromises);
        res.status(200).json({ message: 'Notifications sent successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send some notifications', details: error });
    }
});


app.post('/api/subscribe', (req, res) => {
    const subscription: PushSubscription = req.body;
    subscriptions.push(subscription);
    console.log(subscriptions);
    res.status(200).json({ message: 'Subscription added successfully.' });
});

interface Booking {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    url: string;
}

const bookings: Booking[] = [];

// Endpoint to create a booking
app.post('/booking', (req: Request, res: Response) => {
    const newBooking: Booking = {
        id: bookings.length + 1,
        name: req.body.name,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        url: req.body.url
    };

    bookings.push(newBooking);
    res.status(201).json(newBooking);
});

// Endpoint to retrieve a booking by ID
app.get('/booking/:id', (req: Request, res: Response) => {
    const booking = bookings.find(b => b.id === parseInt(req.params.id));

    if (booking) {
        res.json(booking);
    } else {
        res.status(404).send('Booking not found');
    }
});

// Endpoint to retrieve a booking by ID
app.get('/bookings', (req: Request, res: Response) => {

    if (bookings) {
        res.json(bookings);
    } else {
        res.status(404).send('Booking not found');
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

