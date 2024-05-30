<template>
	<div class="w-screen h-screen archivo overflow-clip bg-[#030409] flex justify-center items-center text-gray-100">

		<img class="absolute h-screen object-cover" src="https://jooinn.com/images/empty-space-1.png" alt="">

		<div class="relative z-10 w-[80vw] h-[80vh] flex flex-col rounded-xl overflow-clip">
			<div class="py-4 px-6 text-[#FFDD53] h-[4rem] text-xl font-semibold">Quotation Calculator</div>
			<div class="py-4 px-6 h-0 border rounded-xl grow overflow-x-hidden overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-400">
				<div class="flex w-full lg:flex-row md:flex-col sm:flex-col items center gap-5">
					<div 
						@click="quotationData.landing_page.checked=!quotationData.landing_page.checked;quotationData.ecommerce.checked=false; calculate()" 
						draggable="false"
						class="lg:w-1/3 md:w-full sm:w-full border rounded-xl flex flex-col gap-3 p-5 hover:border-[#FFDD53] cursor-pointer"
						:class="quotationData.landing_page.checked? 'border-[#FFDD53]':'border-gray-400'"
					>
						Landing Page
						<img draggable="false" class="object-cover w-full aspect-video rounded-xl" src="/src/assets/images/landing1.png" alt="">
						<div class="bg-black w-fit rounded-xl overflow-clip">
							<img draggable="false" class="object-cover w-full aspect-video" src="/src/assets/images/landing2.png" alt="">
						</div>
					</div>
					<div 
						@click="quotationData.ecommerce.checked=!quotationData.ecommerce.checked;quotationData.landing_page.checked=false; calculate()" 
						draggable="false"
						class="lg:w-1/3 md:w-full sm:w-full border rounded-xl flex flex-col gap-3 p-5 hover:border-[#FFDD53] cursor-pointer"
						:class="quotationData.ecommerce.checked? 'border-[#FFDD53]':'border-gray-400'"
					>
						Ecommerce
						<img draggable="false" class="object-cover w-full aspect-video rounded-xl" src="/src/assets/images/ecommerce1.png" alt="">
						<img draggable="false" class="object-cover w-full aspect-video rounded-xl" src="/src/assets/images/ecommerce2.png" alt="">
					</div>
					<div 
						@click="quotationData.custom.checked=!quotationData.custom.checked;quotationData.ecommerce.checked=false; calculate()" 
						draggable="false"
						class="lg:w-1/3 md:w-full sm:w-full border rounded-xl flex flex-col gap-3 p-5 hover:border-[#FFDD53] cursor-pointer"
						:class="quotationData.custom.checked? 'border-[#FFDD53]':'border-gray-400'"
					>
						Custom Web
						<img draggable="false" class="object-cover w-full aspect-video rounded-xl" src="/src/assets/images/custom1.png" alt="">
						<img draggable="false" class="object-cover w-full aspect-video rounded-xl" src="/src/assets/images/custom2.png" alt="">
					</div>
				</div>

				<div v-if="quotationData.custom.checked" class="">
					<h1 class="text-xl font-semibold mt-8">Admin Dashboard <span class="text-[#F8EFC9]">+RM{{ quotationData.admin_dashboard.price }}</span></h1>
					<div class="grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-5">
						<div class="flex items-center gap-3">
							<input @change="calculate" v-model="quotationData.counting.checked" type="checkbox" class=" mt-0.5 border-gray-200  rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="counting">
							<label for="counting" class="ms-3 text-lg cursor-pointer">Counting Analytics <span class="text-[#F8EFC9]">+RM{{ quotationData.counting.price }}</span></label>
							<input @change="calculate" v-model="quotationData.counting.quantity" type="number" min="1" class="py-3 px-4 bg-gray-900 block w-[7rem] border border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
						</div>

						<div class="flex items-center gap-3">
							<input @change="calculate" v-model="quotationData.graph.checked" type="checkbox" class=" mt-0.5 border-gray-200  rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="graph">
							<label for="graph" class="ms-3 text-lg cursor-pointer">Graph Analytics <span class="text-[#F8EFC9]">+RM{{ quotationData.graph.price }}</span></label>
							<input @change="calculate" v-model="quotationData.graph.quantity" type="number" min="1" class="py-3 px-4 bg-gray-900 block w-[7rem] border border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
						</div>
					</div>

					<h1 class="text-xl font-semibold mt-8">Add Ons</h1>
					<div class="grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-5">
						<div class="flex items-center gap-3">
							<input @change="calculate" v-model="quotationData.crud_basic.checked" type="checkbox" class=" mt-0.5 border-gray-200  rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="crud_basic">
							<label for="crud_basic" class="ms-3 text-lg cursor-pointer">CRUD Basic <span class="text-[#F8EFC9]">+RM{{ quotationData.crud_basic.price }}</span></label>
							<input @change="calculate" v-model="quotationData.crud_basic.quantity" type="number" min="1" class="py-3 px-4 bg-gray-900 block w-[7rem] border border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
						</div>
	
						<div class="flex items-center gap-3">
							<input @change="calculate" v-model="quotationData.crud_advanced.checked" type="checkbox" class=" mt-0.5 border-gray-200  rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="crud_advanced">
							<label for="crud_advanced" class="ms-3 text-lg cursor-pointer">CRUD Advanced <span class="text-[#F8EFC9]">+RM{{ quotationData.crud_advanced.price }}</span></label>
							<input @change="calculate" v-model="quotationData.crud_advanced.quantity" type="number" min="1" class="py-3 px-4 bg-gray-900 block w-[7rem] border border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
						</div>
	
						<div class="flex items-center gap-3">
							<input @change="calculate" v-model="quotationData.crud_complex.checked" type="checkbox" class=" mt-0.5 border-gray-200  rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="crud_complex">
							<label for="crud_complex" class="ms-3 text-lg cursor-pointer">CRUD Complex <span class="text-[#F8EFC9]">+RM{{ quotationData.crud_complex.price }}</span></label>
							<input @change="calculate" v-model="quotationData.crud_complex.quantity" type="number" min="1" class="py-3 px-4 bg-gray-900 block w-[7rem] border border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
						</div>
	
						<div class="flex items-center gap-3">
							<input @change="calculate" v-model="quotationData.page_basic.checked" type="checkbox" class=" mt-0.5 border-gray-200  rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="page_basic">
							<label for="page_basic" class="ms-3 text-lg cursor-pointer">Page Basic <span class="text-[#F8EFC9]">+RM{{ quotationData.page_basic.price }}</span></label>
							<input @change="calculate" v-model="quotationData.page_basic.quantity" type="number" min="1" class="py-3 px-4 bg-gray-900 block w-[7rem] border border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
						</div>
	
						<div class="flex items-center gap-3">
							<input @change="calculate" v-model="quotationData.page_advanced.checked" type="checkbox" class=" mt-0.5 border-gray-200  rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="page_advanced">
							<label for="page_advanced" class="ms-3 text-lg cursor-pointer">Page Advanced <span class="text-[#F8EFC9]">+RM{{ quotationData.page_advanced.price }}</span></label>
							<input @change="calculate" v-model="quotationData.page_advanced.quantity" type="number" min="1" class="py-3 px-4 bg-gray-900 block w-[7rem] border border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
						</div>
	
						<div class="flex items-center gap-3">
							<input @change="calculate" v-model="quotationData.page_complex.checked" type="checkbox" class=" mt-0.5 border-gray-200  rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="page_complex">
							<label for="page_complex" class="ms-3 text-lg cursor-pointer">Page Complex <span class="text-[#F8EFC9]">+RM{{ quotationData.page_complex.price }}</span></label>
							<input @change="calculate" v-model="quotationData.page_complex.quantity" type="number" min="1" class="py-3 px-4 bg-gray-900 block w-[7rem] border border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
						</div>
					</div>

					<h1 class="text-xl font-semibold mt-8">System Features</h1>
					<div class="grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-5">
						<div class="flex items-center gap-3">
							<input @change="calculate" v-model="quotationData.third_party.checked" type="checkbox" class=" mt-0.5 border-gray-200  rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="third_party">
							<label for="third_party" class="ms-3 text-lg cursor-pointer">Third Party API Integration <span class="text-[#F8EFC9]">+RM{{ quotationData.third_party.price }}</span></label>
							<input @change="calculate" v-model="quotationData.third_party.quantity" type="number" min="1" class="py-3 px-4 bg-gray-900 block w-[7rem] border border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
						</div>
	
						<div class="flex items-center gap-3">
							<input @change="calculate" v-model="quotationData.real_time_api.checked" type="checkbox" class=" mt-0.5 border-gray-200  rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="real_time_api">
							<label for="real_time_api" class="ms-3 text-lg cursor-pointer">Custom Real Time API <span class="text-[#F8EFC9]">+RM{{ quotationData.real_time_api.price }}</span></label>
							<input @change="calculate" v-model="quotationData.real_time_api.quantity" type="number" min="1" class="py-3 px-4 bg-gray-900 block w-[7rem] border border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
						</div>
	
						<div class="flex items-center gap-3">
							<input @change="calculate" v-model="quotationData.payment_gateway.checked" type="checkbox" class=" mt-0.5 border-gray-200  rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="payment_gateway">
							<label for="payment_gateway" class="ms-3 text-lg cursor-pointer">Payment Gateway <span class="text-[#F8EFC9]">+RM{{ quotationData.payment_gateway.price }}</span></label>
							<input @change="calculate" v-model="quotationData.payment_gateway.quantity" type="number" min="1" class="py-3 px-4 bg-gray-900 block w-[7rem] border border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
						</div>
	
						<div class="flex items-center gap-3">
							<input @change="calculate" v-model="quotationData.animation.checked" type="checkbox" class=" mt-0.5 border-gray-200  rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="animation">
							<label for="animation" class="ms-3 text-lg cursor-pointer">Transition and Animation <span class="text-[#F8EFC9]">+RM{{ quotationData.animation.price }}</span></label>
						</div>
	
						<div class="flex items-center gap-3">
							<input @change="calculate" v-model="quotationData.reponsive.checked" type="checkbox" class=" mt-0.5 border-gray-200  rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="reponsive">
							<label for="reponsive" class="ms-3 text-lg cursor-pointer">Responsive Design <span class="text-[#F8EFC9]">+RM{{ quotationData.reponsive.price }}</span></label>
							<input @change="calculate" v-model="quotationData.reponsive.quantity" type="number" min="1" class="py-3 px-4 bg-gray-900 block w-[7rem] border border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
						</div>
					</div>

					<h1 class="text-xl font-semibold mt-8">Service</h1>
					<div class="grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-5">
						<div class="flex items-center gap-3">
							<input @change="calculate" v-model="quotationData.revision.checked" type="checkbox" class=" mt-0.5 border-gray-200  rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="revision">
							<label for="revision" class="ms-3 text-lg cursor-pointer">Revision <span class="text-[#F8EFC9]">+RM{{ quotationData.revision.price }}</span></label>
							<input @change="calculate" v-model="quotationData.revision.quantity" type="number" min="1" class="py-3 px-4 bg-gray-900 block w-[7rem] border border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
						</div>
	
						<div class="flex items-center gap-3">
							<input @change="calculate" v-model="quotationData.faster_delivery.checked" type="checkbox" class=" mt-0.5 border-gray-200  rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="faster_delivery">
							<label for="faster_delivery" class="ms-3 text-lg cursor-pointer">Faster Delivery <span class="text-[#F8EFC9]">+RM{{ quotationData.faster_delivery.price }}</span></label>
							<input @change="calculate" v-model="quotationData.faster_delivery.quantity" type="number" min="1" class="py-3 px-4 bg-gray-900 block w-[7rem] border border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
						</div>
	
						<div class="flex items-center gap-3">
							<input @change="calculate" v-model="quotationData.hosting_setup.checked" type="checkbox" class=" mt-0.5 border-gray-200  rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hosting_setup">
							<label for="hosting_setup" class="ms-3 text-lg cursor-pointer">Hosting Setup <span class="text-[#F8EFC9]">+RM{{ quotationData.hosting_setup.price }}</span></label>
						</div>
	
						<div class="flex items-center gap-3">
							<input @change="calculate" v-model="quotationData.custom_design.checked" type="checkbox" class=" mt-0.5 border-gray-200  rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="custom_design">
							<label for="custom_design" class="ms-3 text-lg cursor-pointer">Custom Design <span class="text-[#F8EFC9]">+RM{{ quotationData.custom_design.price }}</span></label>
						</div>
	
						<div class="flex items-center gap-3">
							<input @change="calculate" v-model="quotationData.maintenance.checked" type="checkbox" class=" mt-0.5 border-gray-200  rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="maintenance">
							<label for="maintenance" class="ms-3 text-lg cursor-pointer">Maintenance <span class="text-[#F8EFC9]">+RM{{ quotationData.maintenance.price }}</span></label>
							<input @change="calculate" v-model="quotationData.maintenance.quantity" type="number" min="1" class="py-3 px-4 bg-gray-900 block w-[7rem] border border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
						</div>
					</div>

				</div>
			</div>
			<div class="py-4 pe-[4rem] flex items-center justify-end w-full gap-5 h-[5rem] border-t border-gray-400">
				<p>Total:</p>
				<p class="text-3xl">RM{{ totalAmount }}</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const totalAmount = ref(0);

const quotationData = ref({
	landing_page: {
		price: 349,
		checked: false,
	},
	ecommerce: {
		price: 700,
		checked: false,
	},
	custom: {
		checked: false,
	},

	admin_dashboard: {
		price: 180,
		checked: false,
	},
	counting: {
		price: 40,
		checked: false,
		quantity: 1,
	},
	graph: {
		price: 100,
		checked: false,
		quantity: 1,
	},
	crud_basic: {
		price: 300,
		checked: false,
		quantity: 1,
	},
	crud_advanced: {
		price: 450,
		checked: false,
		quantity: 1,
	},
	crud_complex: {
		price: 900,
		checked: false,
		quantity: 1,
	},
	page_basic: {
		price: 100,
		checked: false,
		quantity: 1,
	},
	page_advanced: {
		price: 150,
		checked: false,
		quantity: 1,
	},
	page_complex: {
		price: 300,
		checked: false,
		quantity: 1,
	},
	third_party: {
		price: 140,
		checked: false,
		quantity: 1,
	},
	real_time_api: {
		price: 200,
		checked: false,
		quantity: 1,
	},
	payment_gateway: {
		price: 200,
		checked: false,
		quantity: 1,
	},
	animation: {
		price: 75,
		checked: false,
	},
	reponsive: {
		price: 10,
		checked: false,
		quantity: 1,
	},
	revision: {
		price: 50,
		checked: false,
		quantity: 1,
	},
	faster_delivery: {
		price: 50,
		checked: false,
		quantity: 1,
	},
	hosting_setup: {
		price: 70,
		checked: false,
	},
	custom_design: {
		price: 100,
		checked: false,
	},
	maintenance: {
		price: 30,
		checked: false,
		quantity: 1,
	},
});

const calculate = () => {
  totalAmount.value = quotationData.value.custom.checked? quotationData.value.admin_dashboard.price : 0;

  const items = [
    'landing_page', 'ecommerce', 'admin_dashboard', 'counting', 
    'graph', 'crud_basic', 'crud_advanced', 'crud_complex', 'page_basic', 
    'page_advanced', 'page_complex', 'third_party', 'real_time_api', 
    'payment_gateway', 'animation', 'reponsive', 'revision', 
    'faster_delivery', 'hosting_setup', 'custom_design', 'maintenance'
  ];

  items.forEach(item => {
		if (quotationData.value[item].checked) {
			const quantity = quotationData.value[item].quantity ?? 1;
			totalAmount.value += (quotationData.value[item].price * quantity);
		}
  });
};


</script>