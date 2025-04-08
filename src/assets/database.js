// Fake backend for project 1
// should be replaced by a real database in project 2

import Ballista1 from './ballista-1.jpg';
import Ballista2 from './ballista-2.jpg';
import Ballista3 from './ballista-3.jpg';
import Ballista4 from './ballista-4.jpg';

import BatteringRam1 from './battering-ram-1.jpg';
import BatteringRam2 from './battering-ram-2.jpg';
import BatteringRam3 from './battering-ram-3.jpg';
import BatteringRam4 from './battering-ram-4.jpg';

import Catapult1 from './catapult-1.jpg';
import Catapult2 from './catapult-2.jpg';
import Catapult3 from './catapult-3.jpg';
import Catapult4 from './catapult-4.jpg';

import Escalade1 from './escalade-1.jpg';
import Escalade2 from './escalade-2.jpg';
import Escalade3 from './escalade-3.jpg';

import SiegeHook1 from './siege-hook-1.jpg';
import SiegeHook2 from './siege-hook-2.jpg';

import SiegeTower1 from './siege-tower-1.jpg';
import SiegeTower2 from './siege-tower-2.jpg';
import SiegeTower3 from './siege-tower-3.jpg';
import SiegeTower4 from './siege-tower-4.jpg';



const products = [
	{
		id: 'ballista-1',
		name: 'Rolling Ballista',
		category: 'Ballista',
		image: Ballista1,
		description: "This ballista, made from wood with iron fastenings, is equipped with wheels for better mobility.",
		dimx: 2,
		dimy: 2,
		dimz: 4,
		materials: [
			'wood',
			'iron'
		],
		price: 300,
		discounts: {
			10: .75,
			50: .55
		}
	},
	{
		id: 'ballista-2',
		name: 'Modern Ballista',
		category: 'Ballista',
		image: Ballista2,
		description: "This ballista is crafted from solid steel, and sports a much heftier draw weight than its competitors.",
		dimx: 4,
		dimy: 3,
		dimz: 4,
		materials: [
			'steel'
		],
		price: 400,
		discounts: {
			10: .75,
			50: .55
		}
	},
	{
		id: 'ballista-3',
		name: 'Medieval Ballista',
		category: 'Ballista',
		image: Ballista3,
		description: "This stationary ballista is constructed using ony wood, making it lighter and cheaper at the cost of some power.",
		dimx: 1,
		dimy: 2,
		dimz: 2,
		materials: [
			'wood'
		],
		price: 70,
		discounts: {
			10: .75,
			50: .55
		}
	},
	{
		id: 'ballista-4',
		name: 'Small Roman Ballista',
		category: 'Ballista',
		image: Ballista4,
		description: "This early Roman ballista is made of wood, and held together with iron plates around the frames and iron nails in the stand.",
		dimx: 1,
		dimy: 3,
		dimz: 2,
		materials: [
			'wood',
			'iron'
		],
		price: 100,
		discounts: {
			10: .75,
			50: .55
		}
	},
	{
		id: 'battering-ram-1',
		name: 'Assyrian Battering Ram',
		category: 'Battering Ram',
		image: BatteringRam1,
		description: "More than just a battering ram, this massive piece of siege machinery can transport a force of a dozen men as it decimates enemy fortifications.",
		dimx: 4,
		dimy: 6,
		dimz: 8,
		materials: [
			'wood',
			'packed mud'
		],
		price: 500,
		discounts: {
			10: .75,
			50: .55
		}
	},
	{
		id: 'battering-ram-2',
		name: 'A-Frame Battering Ram',
		category: 'Battering Ram',
		image: BatteringRam2,
		description: "A classic design, balancing speed and power.",
		dimx: 3,
		dimy: 3,
		dimz: 6,
		materials: [
			'wood'
		],
		price: 300,
		discounts: {
			10: .75,
			50: .55
		}
	},
	{
		id: 'battering-ram-3',
		name: 'Light Battering Ram',
		category: 'Battering Ram',
		image: BatteringRam3,
		description: "A battering ram designed to quickly overcome weak fortifications. Iron joints and a reinforced tip ensure durability despite its small frame.",
		dimx: 2,
		dimy: 2,
		dimz: 4,
		materials: [
			'wood',
			'iron'
		],
		price: 300,
		discounts: {
			10: .75,
			50: .55
		}
	},
	{
		id: 'battering-ram-4',
		name: 'Budget Battering Ram',
		category: 'Battering Ram',
		image: BatteringRam4,
		description: "Delivers equivalent power to a standard battering ram using a fraction of the material, sacrificing durability for cost-effectiveness.",
		dimx: 4,
		dimy: 4,
		dimz: 8,
		materials: [
			'wood',
		],
		price: 200,
		discounts: {
			10: .75,
			50: .55
		}
	},
	{
		id: 'catapult-1',
		name: 'Standard Catapult',
		category: 'Catapult',
		image: Catapult1,
		description: "A sturdy frame with heavy iron supports makes this an excellent choice for any war effort.",
		dimx: 4,
		dimy: 7,
		dimz: 8,
		materials: [
			'wood',
			'iron'
		],
		price: 500,
		discounts: {
			10: .75,
			50: .55
		}
	},
	{
		id: 'catapult-2',
		name: 'Twined Catapult',
		category: 'Catapult',
		image: Catapult2,
		description: "Braided steel cables and a cloth sling make this far more powerful and durable than the average catapult.",
		dimx: 4,
		dimy: 7,
		dimz: 8,
		materials: [
			'wood',
			'iron',
			'steel'
		],
		price: 700,
		discounts: {
			10: .75,
			50: .55
		}
	},
	{
		id: 'catapult-3',
		name: 'Light Catapult',
		category: 'Catapult',
		image: Catapult3,
		description: "This catapult makes use of lighter wood and a simpler mechanism to allow for increased mobility on the field.",
		dimx: 2,
		dimy: 4,
		dimz: 4,
		materials: [
			'wood',
		],
		price: 300,
		discounts: {
			10: .75,
			50: .55
		}
	},
	{
		id: 'catapult-4',
		name: 'Long-Range Catapult',
		category: 'Catapult',
		image: Catapult4,
		description: "This catapult uses an extra-wide crossbeam to launch projectiles at a great distance, unmatched by any other machine in its class.",
		dimx: 6,
		dimy: 7,
		dimz: 9,
		materials: [
			'wood',
		],
		price: 800,
		discounts: {
			10: .75,
			50: .55
		}
	},
	{
		id: 'escalade-1',
		name: 'Light Escalade',
		category: 'Escalade',
		image: Escalade1,
		description: "Scale castle walls quickly with this lightweight folding escalade.",
		dimx: 3,
		dimy: 5,
		dimz: 5,
		materials: [
			'wood',
		],
		price: 300,
		discounts: {
			10: .75,
			50: .55
		}
	},
	{
		id: 'escalade-2',
		name: 'Sturdy Escalade',
		category: 'Escalade',
		image: Escalade2,
		description: "This escalade is designed for durability first and foremost, using sturdy wood reinforced with iron brackets.",
		dimx: 3,
		dimy: 5,
		dimz: 5,
		materials: [
			'wood',
			'iron'
		],
		price: 450,
		discounts: {
			10: .75,
			50: .55
		}
	},
	{
		id: 'escalade-3',
		name: 'Mechanical Escalade',
		category: 'Escalade',
		image: Escalade3,
		description: "A cutting-edge gear mechanism allows this escalade to be extended by a single person in just seconds.",
		dimx: 2,
		dimy: 5,
		dimz: 5,
		materials: [
			'wood',
			'iron'
		],
		price: 350,
		discounts: {
			10: .75,
			50: .55
		}
	},
	{
		id: 'siege-hook-1',
		name: 'Light Siege Hook',
		category: 'Siege Hook',
		image: SiegeHook1,
		description: "This light siege hook is suitable for taking down small foundations.",
		dimx: 3,
		dimy: 7,
		dimz: 3,
		materials: [
			'wood',
			'iron'
		],
		price: 350,
		discounts: {
			10: .75,
			50: .55
		}
	},
	{
		id: 'siege-hook-2',
		name: 'Heavy Siege Hook',
		category: 'Siege Hook',
		image: SiegeHook2,
		description: "This solid iron siege hook is suitable for taking down large foundations.",
		dimx: 3,
		dimy: 7,
		dimz: 5,
		materials: [
			'iron'
		],
		price: 550,
		discounts: {
			10: .75,
			50: .55
		}
	},
	{
		id: 'siege-tower-1',
		name: 'Extended Siege Tower',
		category: 'Siege Tower',
		image: SiegeTower1,
		description: "This siege tower has been extended to surmount walls over 20 meters tall.",
		dimx: 5,
		dimy: 28,
		dimz: 8,
		materials: [
			'wood'
		],
		price: 750,
		discounts: {
			10: .75,
			50: .55
		}
	},
	{
		id: 'siege-tower-2',
		name: 'Light Siege Tower',
		category: 'Siege Tower',
		image: SiegeTower2,
		description: "This siege tower serves well as cover for apporaching small fortresses.",
		dimx: 4,
		dimy: 10,
		dimz: 5,
		materials: [
			'wood'
		],
		price: 350,
		discounts: {
			10: .75,
			50: .55
		}
	},
	{
		id: 'siege-tower-3',
		name: 'Rough-Terrain Siege Tower',
		category: 'Siege Tower',
		image: SiegeTower3,
		description: "This siege tower has strengthened wheels with iron spikes for navigating difficult terrain.",
		dimx: 5,
		dimy: 15,
		dimz: 7,
		materials: [
			'wood',
			'iron'
		],
		price: 550,
		discounts: {
			10: .75,
			50: .55
		}
	},
	{
		id: 'siege-tower-4',
		name: 'Standard Siege Tower',
		category: 'Siege Tower',
		image: SiegeTower4,
		description: "This structure is useful for scaling fortress walls up to 15 meters high",
		dimx: 5,
		dimy: 20,
		dimz: 7,
		materials: [
			'wood'
		],
		price: 450,
		discounts: {
			10: .75,
			50: .55
		}
	},
];

export default products;