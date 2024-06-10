<template>

	<div ref="printLayout" :class="printLayoutActive?'':'hidden'" class="absolute w-screen min-h-screen h-fit top-0 left-0 z-50 bg-white text-black font-[calibri] px-8 py-6">
		<div class="w-full flex justify-between items-center">
			<h1 class="font-bold text-2xl">{{ depositLayoutActive||fullyPaidLayoutActive? 'Invoice' : 'Quotation Statement' }}</h1>
			<p><span class="font-semibold">Date Issued:</span> {{ currentDate }}</p>
		</div>

		<div v-if="!depositLayoutActive" class="mt-5 border rounded-xl border-gray-500">
			<div class="w-full p-3 rounded-t-xl text-gray-500 font-semibold bg-gray-100 flex items-center justify-between relative">
				<p class="w-2/4">Name</p>
				<p class="w-1/4">Price Per Item</p>
				<p class="w-1/4">Subtotal</p>
			</div>

			<div class="p-3">
				<p v-if="quotationData.landing_page.checked || quotationData.ecommerce.checked || quotationData.custom.checked" class="font-bold text-lg">Packages</p>
				<div class="flex w-full flex-col items center gap-1">
					<div v-if="quotationData.landing_page.checked" class="w-full flex items-center justify-between relative">
						<p class="w-2/4">Landing Page</p>
						<p class="w-1/4">RM {{ quotationData.landing_page.price }}</p>
						<p class="w-1/4">RM {{ quotationData.landing_page.price }}</p>
					</div>
					<div v-if="quotationData.ecommerce.checked" class="w-full flex items-center justify-between relative">
						<p class="w-2/4">Ecommerce</p>
						<p class="w-1/4">RM {{ quotationData.ecommerce.price }}</p>
						<p class="w-1/4">RM {{ quotationData.ecommerce.price }}</p>
					</div>
					<div v-if="quotationData.custom.checked" class="w-full flex items-center justify-between relative">
						<p class="w-2/4">Custom Web (Authentication and Profile Edit)</p>
						<p class="w-1/4">RM {{ quotationData.custom_web_customization.admin_dashboard.price }}</p>
						<p class="w-1/4">RM {{ quotationData.custom_web_customization.admin_dashboard.price }}</p>
					</div>
				</div>

				<div v-if="quotationData.landing_page.checked">
					<div class="mt-3 w-full h-[1px] bg-gray-300"></div>
					<p class="mt-3 font-bold text-lg">Landing Page Customization</p>
					<p class="font-semibold">Add Ons</p>
					<div v-if="quotationData.landing_page_customization.section.checked" class="w-full flex items-center justify-between relative">
						<p class="w-2/4">Section Basic (x{{ quotationData.landing_page_customization.section.quantity }})</p>
						<p class="w-1/4">RM {{ quotationData.landing_page_customization.section.price }}</p>
						<p class="w-1/4">RM {{ quotationData.landing_page_customization.section.price * quotationData.landing_page_customization.section.quantity }}</p>
					</div>
					<div v-if="quotationData.landing_page_customization.advanced_section.checked" class="w-full flex items-center justify-between relative">
						<p class="w-2/4">Section Advanced (x{{ quotationData.landing_page_customization.advanced_section.quantity }})</p>
						<p class="w-1/4">RM {{ quotationData.landing_page_customization.advanced_section.price }}</p>
						<p class="w-1/4">RM {{ quotationData.landing_page_customization.advanced_section.price * quotationData.landing_page_customization.advanced_section.quantity }}</p>
					</div>
					<div v-if="quotationData.landing_page_customization.complex_section.checked" class="w-full flex items-center justify-between relative">
						<p class="w-2/4">Section Complex (x{{ quotationData.landing_page_customization.complex_section.quantity }})</p>
						<p class="w-1/4">RM {{ quotationData.landing_page_customization.complex_section.price }}</p>
						<p class="w-1/4">RM {{ quotationData.landing_page_customization.complex_section.price * quotationData.landing_page_customization.complex_section.quantity }}</p>
					</div>

					<p class="font-semibold">System Features</p>
					<div v-if="quotationData.landing_page_customization.third_party.checked" class="w-full flex items-center justify-between relative">
						<p class="w-2/4">Third Party (x{{ quotationData.landing_page_customization.third_party.quantity }})</p>
						<p class="w-1/4">RM {{ quotationData.landing_page_customization.third_party.price }}</p>
						<p class="w-1/4">RM {{ quotationData.landing_page_customization.third_party.price * quotationData.landing_page_customization.third_party.quantity }}</p>
					</div>

					<p class="font-semibold">Service</p>
					<div v-if="quotationData.landing_page_customization.revision.checked" class="w-full flex items-center justify-between relative">
						<p class="w-2/4">Revision (x{{ quotationData.landing_page_customization.revision.quantity }})</p>
						<p class="w-1/4">RM {{ quotationData.landing_page_customization.revision.price }}</p>
						<p class="w-1/4">RM {{ quotationData.landing_page_customization.revision.price * quotationData.landing_page_customization.revision.quantity }}</p>
					</div>
					<div v-if="quotationData.landing_page_customization.faster_delivery.checked" class="w-full flex items-center justify-between relative">
						<p class="w-2/4">Faster Delivery (x{{ quotationData.landing_page_customization.faster_delivery.quantity }})</p>
						<p class="w-1/4">RM {{ quotationData.landing_page_customization.faster_delivery.price }}</p>
						<p class="w-1/4">RM {{ quotationData.landing_page_customization.faster_delivery.price * quotationData.landing_page_customization.faster_delivery.quantity }}</p>
					</div>
					<div v-if="quotationData.landing_page_customization.hosting_setup.checked" class="w-full flex items-center justify-between relative">
						<p class="w-2/4">Hosting Setup (x{{ quotationData.landing_page_customization.hosting_setup.quantity }})</p>
						<p class="w-1/4">RM {{ quotationData.landing_page_customization.hosting_setup.price }}</p>
						<p class="w-1/4">RM {{ quotationData.landing_page_customization.hosting_setup.price * quotationData.landing_page_customization.hosting_setup.quantity }}</p>
					</div>
					<div v-if="quotationData.landing_page_customization.custom_design.checked" class="w-full flex items-center justify-between relative">
						<p class="w-2/4">Custom Design (x{{ quotationData.landing_page_customization.custom_design.quantity }})</p>
						<p class="w-1/4">RM {{ quotationData.landing_page_customization.custom_design.price }}</p>
						<p class="w-1/4">RM {{ quotationData.landing_page_customization.custom_design.price * quotationData.landing_page_customization.custom_design.quantity }}</p>
					</div>
					<div v-if="quotationData.landing_page_customization.maintenance.checked" class="w-full flex items-center justify-between relative">
						<p class="w-2/4">Maintenance (x{{ quotationData.landing_page_customization.maintenance.quantity }})</p>
						<p class="w-1/4">RM {{ quotationData.landing_page_customization.maintenance.price }}</p>
						<p class="w-1/4">RM {{ quotationData.landing_page_customization.maintenance.price * quotationData.landing_page_customization.maintenance.quantity }}</p>
					</div>
				</div>

				<div v-if="quotationData.custom.checked">
					<div class="mt-3 w-full h-[1px] bg-gray-300"></div>
					<p class="mt-3 font-bold text-lg">Custom Web Customization</p>
					<p class="font-semibold">Admin Dashboard</p>
					<div v-if="quotationData.custom_web_customization.counting.checked" class="w-full flex items-center justify-between relative">
						<p class="w-2/4">Counting Analytics (x{{ quotationData.custom_web_customization.counting.quantity }})</p>
						<p class="w-1/4">RM {{ quotationData.custom_web_customization.counting.price }}</p>
						<p class="w-1/4">RM {{ quotationData.custom_web_customization.counting.price * quotationData.custom_web_customization.counting.quantity }}</p>
					</div>
					<div v-if="quotationData.custom_web_customization.graph.checked" class="w-full flex items-center justify-between relative">
						<p class="w-2/4">Graph (x{{ quotationData.custom_web_customization.graph.quantity }})</p>
						<p class="w-1/4">RM {{ quotationData.custom_web_customization.graph.price }}</p>
						<p class="w-1/4">RM {{ quotationData.custom_web_customization.graph.price * quotationData.custom_web_customization.graph.quantity }}</p>
					</div>
					
					<p class="font-semibold">Add Ons</p>
					<div v-if="quotationData.custom_web_customization.crud_basic.checked" class="w-full flex items-center justify-between relative">
						<p class="w-2/4">CRUD Basic (x{{ quotationData.custom_web_customization.crud_basic.quantity }})</p>
						<p class="w-1/4">RM {{ quotationData.custom_web_customization.crud_basic.price }}</p>
						<p class="w-1/4">RM {{ quotationData.custom_web_customization.crud_basic.price * quotationData.custom_web_customization.crud_basic.quantity }}</p>
					</div>
					<div v-if="quotationData.custom_web_customization.crud_advanced.checked" class="w-full flex items-center justify-between relative">
						<p class="w-2/4">CRUD Advanced (x{{ quotationData.custom_web_customization.crud_advanced.quantity }})</p>
						<p class="w-1/4">RM {{ quotationData.custom_web_customization.crud_advanced.price }}</p>
						<p class="w-1/4">RM {{ quotationData.custom_web_customization.crud_advanced.price * quotationData.custom_web_customization.crud_advanced.quantity }}</p>
					</div>
					<div v-if="quotationData.custom_web_customization.crud_complex.checked" class="w-full flex items-center justify-between relative">
						<p class="w-2/4">CRUD Complex (x{{ quotationData.custom_web_customization.crud_complex.quantity }})</p>
						<p class="w-1/4">RM {{ quotationData.custom_web_customization.crud_complex.price }}</p>
						<p class="w-1/4">RM {{ quotationData.custom_web_customization.crud_complex.price * quotationData.custom_web_customization.crud_complex.quantity }}</p>
					</div>
					<div v-if="quotationData.custom_web_customization.page_basic.checked" class="w-full flex items-center justify-between relative">
						<p class="w-2/4">Page Basic (x{{ quotationData.custom_web_customization.page_basic.quantity }})</p>
						<p class="w-1/4">RM {{ quotationData.custom_web_customization.page_basic.price }}</p>
						<p class="w-1/4">RM {{ quotationData.custom_web_customization.page_basic.price * quotationData.custom_web_customization.page_basic.quantity }}</p>
					</div>
					<div v-if="quotationData.custom_web_customization.page_advanced.checked" class="w-full flex items-center justify-between relative">
						<p class="w-2/4">Page Advanced (x{{ quotationData.custom_web_customization.page_advanced.quantity }})</p>
						<p class="w-1/4">RM {{ quotationData.custom_web_customization.page_advanced.price }}</p>
						<p class="w-1/4">RM {{ quotationData.custom_web_customization.page_advanced.price * quotationData.custom_web_customization.page_advanced.quantity }}</p>
					</div>
					<div v-if="quotationData.custom_web_customization.page_complex.checked" class="w-full flex items-center justify-between relative">
						<p class="w-2/4">Page Complex (x{{ quotationData.custom_web_customization.page_complex.quantity }})</p>
						<p class="w-1/4">RM {{ quotationData.custom_web_customization.page_complex.price }}</p>
						<p class="w-1/4">RM {{ quotationData.custom_web_customization.page_complex.price * quotationData.custom_web_customization.page_complex.quantity }}</p>
					</div>

					<p class="font-semibold">System Features</p>
					<div v-if="quotationData.custom_web_customization.third_party.checked" class="w-full flex items-center justify-between relative">
						<p class="w-2/4">Third Party (x{{ quotationData.custom_web_customization.third_party.quantity }})</p>
						<p class="w-1/4">RM {{ quotationData.custom_web_customization.third_party.price }}</p>
						<p class="w-1/4">RM {{ quotationData.custom_web_customization.third_party.price * quotationData.custom_web_customization.third_party.quantity }}</p>
					</div>
					<div v-if="quotationData.custom_web_customization.real_time_api.checked" class="w-full flex items-center justify-between relative">
						<p class="w-2/4">Real Time API (x{{ quotationData.custom_web_customization.real_time_api.quantity }})</p>
						<p class="w-1/4">RM {{ quotationData.custom_web_customization.real_time_api.price }}</p>
						<p class="w-1/4">RM {{ quotationData.custom_web_customization.real_time_api.price * quotationData.custom_web_customization.real_time_api.quantity }}</p>
					</div>
					<div v-if="quotationData.custom_web_customization.payment_gateway.checked" class="w-full flex items-center justify-between relative">
						<p class="w-2/4">Payment Gateway (x{{ quotationData.custom_web_customization.payment_gateway.quantity }})</p>
						<p class="w-1/4">RM {{ quotationData.custom_web_customization.payment_gateway.price }}</p>
						<p class="w-1/4">RM {{ quotationData.custom_web_customization.payment_gateway.price * quotationData.custom_web_customization.payment_gateway.quantity }}</p>
					</div>
					<div v-if="quotationData.custom_web_customization.animation.checked" class="w-full flex items-center justify-between relative">
						<p class="w-2/4">Animation and Transition (x{{ quotationData.custom_web_customization.animation.quantity }})</p>
						<p class="w-1/4">RM {{ quotationData.custom_web_customization.animation.price }}</p>
						<p class="w-1/4">RM {{ quotationData.custom_web_customization.animation.price }}</p>
					</div>
					<div v-if="quotationData.custom_web_customization.responsive.checked" class="w-full flex items-center justify-between relative">
						<p class="w-2/4">Responsive Layout (x{{ quotationData.custom_web_customization.responsive.quantity }})</p>
						<p class="w-1/4">RM {{ quotationData.custom_web_customization.responsive.price }}</p>
						<p class="w-1/4">RM {{ quotationData.custom_web_customization.responsive.price * quotationData.custom_web_customization.responsive.quantity }}</p>
					</div>

					<p class="font-semibold">Service</p>
					<div v-if="quotationData.custom_web_customization.revision.checked" class="w-full flex items-center justify-between relative">
						<p class="w-2/4">Revision (x{{ quotationData.custom_web_customization.revision.quantity }})</p>
						<p class="w-1/4">RM {{ quotationData.custom_web_customization.revision.price }}</p>
						<p class="w-1/4">RM {{ quotationData.custom_web_customization.revision.price * quotationData.custom_web_customization.revision.quantity }}</p>
					</div>
					<div v-if="quotationData.custom_web_customization.faster_delivery.checked" class="w-full flex items-center justify-between relative">
						<p class="w-2/4">Faster Delivery (x{{ quotationData.custom_web_customization.faster_delivery.quantity }})</p>
						<p class="w-1/4">RM {{ quotationData.custom_web_customization.faster_delivery.price }}</p>
						<p class="w-1/4">RM {{ quotationData.custom_web_customization.faster_delivery.price * quotationData.custom_web_customization.faster_delivery.quantity }}</p>
					</div>
					<div v-if="quotationData.custom_web_customization.hosting_setup.checked" class="w-full flex items-center justify-between relative">
						<p class="w-2/4">Hosting Setup (x{{ quotationData.custom_web_customization.hosting_setup.quantity }})</p>
						<p class="w-1/4">RM {{ quotationData.custom_web_customization.hosting_setup.price }}</p>
						<p class="w-1/4">RM {{ quotationData.custom_web_customization.hosting_setup.price * quotationData.custom_web_customization.hosting_setup.quantity }}</p>
					</div>
					<div v-if="quotationData.custom_web_customization.custom_design.checked" class="w-full flex items-center justify-between relative">
						<p class="w-2/4">Custom Design (x{{ quotationData.custom_web_customization.custom_design.quantity }})</p>
						<p class="w-1/4">RM {{ quotationData.custom_web_customization.custom_design.price }}</p>
						<p class="w-1/4">RM {{ quotationData.custom_web_customization.custom_design.price * quotationData.custom_web_customization.custom_design.quantity }}</p>
					</div>
					<div v-if="quotationData.custom_web_customization.maintenance.checked" class="w-full flex items-center justify-between relative">
						<p class="w-2/4">Maintenance (x{{ quotationData.custom_web_customization.maintenance.quantity }})</p>
						<p class="w-1/4">RM {{ quotationData.custom_web_customization.maintenance.price }}</p>
						<p class="w-1/4">RM {{ quotationData.custom_web_customization.maintenance.price * quotationData.custom_web_customization.maintenance.quantity }}</p>
					</div>
				</div>

				<div v-if="fullyPaidLayoutActive">
					<div class="mt-3 w-full h-[1px] bg-gray-300"></div>
					<div v-if="fullyPaidLayoutActive" class="mt-3 w-full flex items-center justify-between relative">
						<p class="w-2/4">Deposit {{ totalAmount<=500? '80%' : '50%' }}</p>
						<p class="w-1/4">RM {{ -(totalAmount * (totalAmount<=500? 0.8 : 0.5)).toFixed(2) }}</p>
						<p class="w-1/4">RM {{ -(totalAmount * (totalAmount<=500? 0.8 : 0.5)).toFixed(2) }}</p>
					</div>
				</div>
			</div>
			<div class="w-full p-3 mt-3 border-t border-gray-500">
				<div class="w-full flex items-center justify-between relative">
					<p class="w-2/4 text-lg font-bold">Total</p>
					<p class="w-1/4"></p>
					<p v-if="fullyPaidLayoutActive" class="w-1/4 text-lg font-bold">RM {{ (totalAmount - (totalAmount * (totalAmount<=500? 0.8 : 0.5))).toFixed(2) }}</p>
					<p v-if="!fullyPaidLayoutActive" class="w-1/4 text-lg font-bold">RM {{ (totalAmount).toFixed(2) }}</p>
				</div>
				<div v-if="!fullyPaidLayoutActive" class="w-full flex items-center justify-between relative">
					<p class="w-2/4 text-lg font-bold">Estimated delivery time</p>
					<p class="w-1/4"></p>
					<p class="w-1/4 text-lg font-bold">{{ totalDays }} days</p>
				</div>
			</div>
		</div>
	
		<div v-if="depositLayoutActive">
			<div class="mt-5 border rounded-xl border-gray-500">
				<div class="w-full p-3 rounded-t-xl text-gray-500 font-semibold bg-gray-100 flex items-center justify-between relative">
					<p class="w-6/12">Item</p>
					<p class="w-2/12">Quantity</p>
					<p class="w-2/12">Price</p>
					<p class="w-2/12">Amount</p>
				</div>

				<div class="p-3">
					<div class="flex items-center">
						<div class="w-6/12">Deposit {{ totalAmount<=500? '80%' : '50%' }}</div>
						<div class="w-2/12">1</div>
						<div class="w-2/12">RM {{ (totalAmount * (totalAmount<=500? 0.8 : 0.5)).toFixed(2) }}</div>
						<div class="w-2/12">RM {{ (totalAmount * (totalAmount<=500? 0.8 : 0.5)).toFixed(2) }}</div>
					</div>
				</div>

				<div class="w-full p-3 mt-3 border-t border-gray-500">
					<div class="w-full flex items-center justify-between relative">
						<p class="w-1/2 text-lg font-bold">Total</p>
						<p class="w-1/6"></p>
						<p class="w-1/6 text-lg font-bold">RM {{ (totalAmount * (totalAmount<=500? 0.8 : 0.5)).toFixed(2) }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>


	<div class="w-screen h-screen archivo overflow-clip bg-[#030409] flex justify-center items-center text-gray-100">

		<img draggable="false" class="absolute h-screen object-cover" src="https://jooinn.com/images/empty-space-1.png" alt="">

		<div class="relative z-10 w-[80vw] h-[100vh] flex flex-col rounded-xl overflow-clip">
			<div class="py-4 px-6 flex flex-row justify-between items-center">
				<div class="text-[#FFDD53] lg:h-[4rem] md:h-[4rem] sm:h-[6rem] text-3xl font-semibold">Quotation Calculator</div>
			</div>
			
			<div class="relative h-0 border border-gray-200 bg-gradient-to-br from-[rgba(50,50,50,.3)] to-[rgba(70,70,70,.3)] backdrop-blur-sm rounded-xl grow overflow-x-hidden overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-400">
				
				<div class="py-4 px-6 relative z-10">
					<h1 class="text-xl font-semibold text-[#FFDD53]">Packages</h1>
					<div class="mt-5 flex w-full lg:flex-row md:flex-col sm:flex-col items center gap-5">
						<div 
							@click="quotationData.landing_page.checked=!quotationData.landing_page.checked;quotationData.ecommerce.checked=false; calculate()" 
							draggable="false"
							class="lg:w-1/3 md:w-full sm:w-full relative border-2 rounded-xl p-5 hover:border-[#FFDD53] cursor-pointer"
							:class="quotationData.landing_page.checked? 'border-[#FFDD53]':'border-gray-500'"
						>
							<div class="relative z-10 flex overflow-clip flex-col gap-3">
								Landing Page
								<img draggable="false" class="object-cover w-full aspect-video rounded-xl" src="/src/assets/images/landing1.png" alt="">
								<div class="bg-black w-fit rounded-xl overflow-clip">
									<img draggable="false" class="object-cover w-full aspect-video" src="/src/assets/images/landing2.png" alt="">
								</div>
							</div>
						</div>
						<!-- <div 
							@click="quotationData.ecommerce.checked=!quotationData.ecommerce.checked;quotationData.landing_page.checked=false; calculate()" 
							draggable="false"
							class="lg:w-1/3 md:w-full sm:w-full relative border-2 rounded-xl p-5 hover:border-[#FFDD53] cursor-pointer"
							:class="quotationData.ecommerce.checked? 'border-[#FFDD53]':'border-gray-500'"
						> -->
						<div  
							draggable="false"
							class="lg:w-1/3 md:w-full sm:w-full relative border-2 rounded-xl border-gray-500 p-5 cursor-pointer opacity-50"
						>
							<div class="relative z-10 flex overflow-clip flex-col gap-3">
								Ecommerce
								<img draggable="false" class="object-cover w-full aspect-video rounded-xl" src="/src/assets/images/ecommerce1.png" alt="">
								<img draggable="false" class="object-cover w-full aspect-video rounded-xl" src="/src/assets/images/ecommerce2.png" alt="">
							</div>
						</div>
						<div 
							@click="quotationData.custom.checked=!quotationData.custom.checked;quotationData.ecommerce.checked=false; calculate()" 
							draggable="false"
							class="lg:w-1/3 md:w-full sm:w-full relative border-2 rounded-xl p-5 hover:border-[#FFDD53] cursor-pointer"
							:class="quotationData.custom.checked? 'border-[#FFDD53]':'border-gray-500'"
						>
							<div class="relative z-10 flex overflow-clip flex-col gap-3">
								Custom Web
								<img draggable="false" class="object-cover w-full aspect-video rounded-xl" src="/src/assets/images/custom1.png" alt="">
								<img draggable="false" class="object-cover w-full aspect-video rounded-xl" src="/src/assets/images/custom2.png" alt="">
							</div>
						</div>
					</div>
					
					
					<div v-if="quotationData.landing_page.checked">
						<h1 class="text-xl font-semibold mt-8 text-[#FFDD53]">Landing Page Customizations</h1>
						<div class="mt-3 grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-5">
							
							<div class="flex flex-col w-full">
								<div class="flex relative z-10 items-center bg-gray-800 border border-white rounded-lg overflow-clip">
									<input @change="calculate"  v-model="quotationData.landing_page_customization.section.checked" type="checkbox" id="section" class="hidden" >
									<div 
										@click="quotationData.landing_page_customization.section.checked=!quotationData.landing_page_customization.section.checked; calculate();"
										:class="quotationData.landing_page_customization.section.checked?'bg-blue-500':'bg-gray-900'" 
										class="w-8 h-12 border-r border-white cursor-pointer me-3"
									></div>
									<div @click="quotationData.landing_page_customization.section.dropdown=!quotationData.landing_page_customization.section.dropdown" class="grow text-md cursor-pointer select-none me-3 hover:opacity-75">Section Basic</div>
									<input @change="calculate" v-model="quotationData.landing_page_customization.section.quantity" type="number" min="1" class="py-3 px-4 bg-gray-900 block w-[5rem] border-x border-white text-sm focus:outline-0 focus:ring-0 disabled:pointer-events-none">
									<div class="flex h-[3rem]">
										<div @click="quotationData.landing_page_customization.section.quantity > 1 ? quotationData.landing_page_customization.section.quantity-- : null; calculate();" :class="quotationData.landing_page_customization.section.quantity==1?'opacity-50':''" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:minus"></Icon></div>
										<div @click="quotationData.landing_page_customization.section.quantity++; calculate()" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:plus"></Icon></div>
									</div>
								</div>
								<div :class="quotationData.landing_page_customization.section.dropdown?'h-fit pt-3 pb-2 opacity-100':'h-0 opacity-0'" class="transition-all duration-300 border border-gray-500 border-t-0 bg-gray-800 px-4 rounded-b-lg mt-[-0.3rem] z-[9] overflow-clip">
									<div class="flex justify-between items-center w-full text-lg">
										<div class="">{{ quotationData.landing_page_customization.section.duration }} days</div>
										<div class="">RM{{ quotationData.landing_page_customization.section.price }}</div>
									</div>
									<div class="w-full text-sm mt-1 text-gray-300">
										<ul class="list-disc list-inside">
											<li>Media (Images, Videos, Audio)</li>
											<li>Static UI</li>
											<li>Styling</li>
											<li>Responsive</li>
										</ul>
									</div>
								</div>
							</div>
		
							<div class="flex flex-col w-full">
								<div class="flex relative z-10 items-center bg-gray-800 border border-white rounded-lg overflow-clip">
									<input @change="calculate"  v-model="quotationData.landing_page_customization.advanced_section.checked" type="checkbox" id="section" class="hidden" >
									<div 
										@click="quotationData.landing_page_customization.advanced_section.checked=!quotationData.landing_page_customization.advanced_section.checked; calculate();"
										:class="quotationData.landing_page_customization.advanced_section.checked?'bg-blue-500':'bg-gray-900'" 
										class="w-8 h-12 border-r border-white cursor-pointer me-3"
									></div>
									<div @click="quotationData.landing_page_customization.advanced_section.dropdown=!quotationData.landing_page_customization.advanced_section.dropdown" class="grow text-md cursor-pointer select-none me-3 hover:opacity-75">Section Advanced</div>
									<input @change="calculate" v-model="quotationData.landing_page_customization.advanced_section.quantity" type="number" min="1" class="py-3 px-4 bg-gray-900 block w-[5rem] border-x border-white text-sm focus:outline-0 focus:ring-0 disabled:pointer-events-none">
									<div class="flex h-[3rem]">
										<div @click="quotationData.landing_page_customization.advanced_section.quantity > 1 ? quotationData.landing_page_customization.advanced_section.quantity-- : null; calculate();" :class="quotationData.landing_page_customization.advanced_section.quantity==1?'opacity-50':''" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:minus"></Icon></div>
										<div @click="quotationData.landing_page_customization.advanced_section.quantity++; calculate()" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:plus"></Icon></div>
									</div>
								</div>
								<div :class="quotationData.landing_page_customization.advanced_section.dropdown?'h-fit pt-3 pb-2 opacity-100':'h-0 opacity-0'" class="transition-all duration-300 border border-gray-500 border-t-0 bg-gray-800 px-4 rounded-b-lg mt-[-0.3rem] z-[9] overflow-clip">
									<div class="flex justify-between items-center w-full text-lg">
										<div class="">{{ quotationData.landing_page_customization.advanced_section.duration }} days</div>
										<div class="">RM{{ quotationData.landing_page_customization.advanced_section.price }}</div>
									</div>
									<div class="w-full text-sm mt-1 text-gray-300">
										<ul class="list-disc list-inside">
											<li>Media (Images, Videos, Audio)</li>
											<li>Dynamic UI</li>
											<li>Styling</li>
											<li>Animation</li>
											<li>Responsive</li>
											<li>JavaScript</li>
										</ul>
									</div>
								</div>
							</div>
		
							<div class="flex flex-col w-full">
								<div class="flex relative z-10 items-center bg-gray-800 border border-white rounded-lg overflow-clip">
									<input @change="calculate"  v-model="quotationData.landing_page_customization.complex_section.checked" type="checkbox" id="section" class="hidden" >
									<div 
										@click="quotationData.landing_page_customization.complex_section.checked=!quotationData.landing_page_customization.complex_section.checked; calculate();"
										:class="quotationData.landing_page_customization.complex_section.checked?'bg-blue-500':'bg-gray-900'" 
										class="w-8 h-12 border-r border-white cursor-pointer me-3"
									></div>
									<div @click="quotationData.landing_page_customization.complex_section.dropdown=!quotationData.landing_page_customization.complex_section.dropdown" class="grow text-md cursor-pointer select-none me-3 hover:opacity-75">Section Complex</div>
									<input @change="calculate" v-model="quotationData.landing_page_customization.complex_section.quantity" type="number" min="1" class="py-3 px-4 bg-gray-900 block w-[5rem] border-x border-white text-sm focus:outline-0 focus:ring-0 disabled:pointer-events-none">
									<div class="flex h-[3rem]">
										<div @click="quotationData.landing_page_customization.complex_section.quantity > 1 ? quotationData.landing_page_customization.complex_section.quantity-- : null; calculate();" :class="quotationData.landing_page_customization.complex_section.quantity==1?'opacity-50':''" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:minus"></Icon></div>
										<div @click="quotationData.landing_page_customization.complex_section.quantity++; calculate()" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:plus"></Icon></div>
									</div>
								</div>
								<div :class="quotationData.landing_page_customization.complex_section.dropdown?'h-fit pt-3 pb-2 opacity-100':'h-0 opacity-0'" class="transition-all duration-300 border border-gray-500 border-t-0 bg-gray-800 px-4 rounded-b-lg mt-[-0.3rem] z-[9] overflow-clip">
									<div class="flex justify-between items-center w-full text-lg">
										<div class="">{{ quotationData.landing_page_customization.complex_section.duration }} days</div>
										<div class="">RM{{ quotationData.landing_page_customization.complex_section.price }}</div>
									</div>
									<div class="w-full text-sm mt-1 text-gray-300">
										<ul class="list-disc list-inside">
											<li>Media (Images, Videos, Audio)</li>
											<li>Dynamic UI</li>
											<li>Styling</li>
											<li>Animation</li>
											<li>Responsive</li>
											<li>JavaScript</li>
											<li>Third Party</li>
										</ul>
									</div>
								</div>
							</div>
						</div>

						<h1 class="text-xl font-semibold mt-8">System Features</h1>
						<div class="mt-3 grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-5">
							<div class="flex flex-col w-full">
								<div class="flex relative z-10 items-center bg-gray-800 border border-white rounded-lg overflow-clip">
									<input @change="calculate"  v-model="quotationData.landing_page_customization.third_party.checked" type="checkbox" id="section" class="hidden" >
									<div 
										@click="quotationData.landing_page_customization.third_party.checked=!quotationData.landing_page_customization.third_party.checked; calculate();"
										:class="quotationData.landing_page_customization.third_party.checked?'bg-blue-500':'bg-gray-900'" 
										class="w-8 h-12 border-r border-white cursor-pointer me-3"
									></div>
									<div @click="quotationData.landing_page_customization.third_party.dropdown=!quotationData.landing_page_customization.third_party.dropdown" class="grow text-md cursor-pointer select-none me-3 hover:opacity-75">Third Party API Integration</div>
									<input @change="calculate" v-model="quotationData.landing_page_customization.third_party.quantity" type="number" min="1" class="py-3 px-4 bg-gray-900 block w-[5rem] border-x border-white text-sm focus:outline-0 focus:ring-0 disabled:pointer-events-none">
									<div class="flex h-[3rem]">
										<div @click="quotationData.landing_page_customization.third_party.quantity > 1 ? quotationData.landing_page_customization.third_party.quantity-- : null; calculate();" :class="quotationData.landing_page_customization.third_party.quantity==1?'opacity-50':''" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:minus"></Icon></div>
										<div @click="quotationData.landing_page_customization.third_party.quantity++; calculate()" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:plus"></Icon></div>
									</div>
								</div>
								<div :class="quotationData.landing_page_customization.third_party.dropdown?'h-fit pt-3 pb-2 opacity-100':'h-0 opacity-0'" class="transition-all duration-300 border border-gray-500 border-t-0 bg-gray-800 px-4 rounded-b-lg mt-[-0.3rem] z-[9] overflow-clip">
									<div class="flex justify-between items-center w-full text-lg">
										<div class="">{{ quotationData.landing_page_customization.third_party.duration }} days</div>
										<div class="">RM{{ quotationData.landing_page_customization.third_party.price }}</div>
									</div>
									<div class="w-full text-sm mt-1 text-gray-300">
										<ul class="list-disc list-inside">
											<li>Maps</li>
										</ul>
									</div>
								</div>
							</div>
						</div>

						<h1 class="text-xl font-semibold mt-8">Service</h1>
						<div class="mt-3 grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-5">
							<div class="flex flex-col w-full">
								<div class="flex relative z-10 items-center bg-gray-800 border border-white rounded-lg overflow-clip">
									<input @change="calculate"  v-model="quotationData.landing_page_customization.revision.checked" type="checkbox" id="section" class="hidden" >
									<div 
										@click="quotationData.landing_page_customization.revision.checked=!quotationData.landing_page_customization.revision.checked; calculate();"
										:class="quotationData.landing_page_customization.revision.checked?'bg-blue-500':'bg-gray-900'" 
										class="w-8 h-12 border-r border-white cursor-pointer me-3"
									></div>
									<div @click="quotationData.landing_page_customization.revision.dropdown=!quotationData.landing_page_customization.revision.dropdown" class="grow text-md cursor-pointer select-none me-3 hover:opacity-75">Revision</div>
									<input @change="calculate" v-model="quotationData.landing_page_customization.revision.quantity" type="number" min="1" class="py-3 px-4 bg-gray-900 block w-[5rem] border-x border-white text-sm focus:outline-0 focus:ring-0 disabled:pointer-events-none">
									<div class="flex h-[3rem]">
										<div @click="quotationData.landing_page_customization.revision.quantity > 1 ? quotationData.landing_page_customization.revision.quantity-- : null; calculate();" :class="quotationData.landing_page_customization.revision.quantity==1?'opacity-50':''" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:minus"></Icon></div>
										<div @click="quotationData.landing_page_customization.revision.quantity++; calculate()" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:plus"></Icon></div>
									</div>
								</div>
								<div :class="quotationData.landing_page_customization.revision.dropdown?'h-fit pt-3 pb-2 opacity-100':'h-0 opacity-0'" class="transition-all duration-300 border border-gray-500 border-t-0 bg-gray-800 px-4 rounded-b-lg mt-[-0.3rem] z-[9] overflow-clip">
									<div class="flex justify-between items-center w-full text-lg">
										<div class="">{{ quotationData.landing_page_customization.revision.duration }} day</div>
										<div class="">RM{{ quotationData.landing_page_customization.revision.price }}</div>
									</div>
								</div>
							</div>
		
							<div class="flex flex-col w-full">
								<div class="flex relative z-10 items-center bg-gray-800 border border-white rounded-lg overflow-clip">
									<input @change="calculate"  v-model="quotationData.landing_page_customization.faster_delivery.checked" type="checkbox" id="section" class="hidden" >
									<div 
										@click="quotationData.landing_page_customization.faster_delivery.checked=!quotationData.landing_page_customization.faster_delivery.checked; calculate();"
										:class="quotationData.landing_page_customization.faster_delivery.checked?'bg-blue-500':'bg-gray-900'" 
										class="w-8 h-12 border-r border-white cursor-pointer me-3"
									></div>
									<div @click="quotationData.landing_page_customization.faster_delivery.dropdown=!quotationData.landing_page_customization.faster_delivery.dropdown" class="grow text-md cursor-pointer select-none me-3 hover:opacity-75">Faster Delivery</div>
									<input @change="calculate" v-model="quotationData.landing_page_customization.faster_delivery.quantity" type="number" min="1" class="py-3 px-4 bg-gray-900 block w-[5rem] border-x border-white text-sm focus:outline-0 focus:ring-0 disabled:pointer-events-none">
									<div class="flex h-[3rem]">
										<div @click="quotationData.landing_page_customization.faster_delivery.quantity > 1 ? quotationData.landing_page_customization.faster_delivery.quantity-- : null; calculate();" :class="quotationData.landing_page_customization.faster_delivery.quantity==1?'opacity-50':''" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:minus"></Icon></div>
										<div @click="quotationData.landing_page_customization.faster_delivery.quantity++; calculate()" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:plus"></Icon></div>
									</div>
								</div>
								<div :class="quotationData.landing_page_customization.faster_delivery.dropdown?'h-fit pt-3 pb-2 opacity-100':'h-0 opacity-0'" class="transition-all duration-300 border border-gray-500 border-t-0 bg-gray-800 px-4 rounded-b-lg mt-[-0.3rem] z-[9] overflow-clip">
									<div class="flex justify-between items-center w-full text-lg">
										<div class="">-{{ quotationData.landing_page_customization.faster_delivery.quantity * 3 }} days</div>
										<div class="">RM{{ quotationData.landing_page_customization.faster_delivery.price }}</div>
									</div>
								</div>
							</div>
		
							<div class="flex flex-col w-full">
								<div class="flex relative z-10 items-center bg-gray-800 border border-white rounded-lg overflow-clip">
									<input @change="calculate"  v-model="quotationData.landing_page_customization.hosting_setup.checked" type="checkbox" id="section" class="hidden" >
									<div 
										@click="quotationData.landing_page_customization.hosting_setup.checked=!quotationData.landing_page_customization.hosting_setup.checked; calculate();"
										:class="quotationData.landing_page_customization.hosting_setup.checked?'bg-blue-500':'bg-gray-900'" 
										class="w-8 h-12 border-r border-white cursor-pointer me-3"
									></div>
									<div @click="quotationData.landing_page_customization.hosting_setup.dropdown=!quotationData.landing_page_customization.hosting_setup.dropdown" class="grow text-md cursor-pointer select-none me-3 hover:opacity-75">Hosting Setup</div>
								</div>
								<div :class="quotationData.landing_page_customization.hosting_setup.dropdown?'h-fit pt-3 pb-2 opacity-100':'h-0 opacity-0'" class="transition-all duration-300 border border-gray-500 border-t-0 bg-gray-800 px-4 rounded-b-lg mt-[-0.3rem] z-[9] overflow-clip">
									<div class="flex justify-between items-center w-full text-lg">
										<div class="">{{ quotationData.landing_page_customization.hosting_setup.duration }} days</div>
										<div class="">RM{{ quotationData.landing_page_customization.hosting_setup.price }}</div>
									</div>
									<div class="w-full text-sm mt-1 text-gray-300">
										<p>Hosting payment will not be made by the developer, only deploying/setting the website into hosting to make it accessible online.</p>
										<p class="mt-1">Deselecting this option the developer will handout the website souce code instead.</p>
									</div>
								</div>
							</div>
		
							<!-- <div class="flex flex-col w-full">
								<div class="flex relative z-10 items-center bg-gray-800 border border-white rounded-lg overflow-clip">
									<input @change="calculate"  v-model="quotationData.landing_page_customization.custom_design.checked" type="checkbox" id="section" class="hidden" >
									<div 
										@click="quotationData.landing_page_customization.custom_design.checked=!quotationData.landing_page_customization.custom_design.checked; calculate();"
										:class="quotationData.landing_page_customization.custom_design.checked?'bg-blue-500':'bg-gray-900'" 
										class="w-8 h-12 border-r border-white cursor-pointer me-3"
									></div>
									<div @click="quotationData.landing_page_customization.custom_design.dropdown=!quotationData.landing_page_customization.custom_design.dropdown" class="grow text-md cursor-pointer select-none me-3 hover:opacity-75">Custom Design</div>
									<input @change="calculate" v-model="quotationData.landing_page_customization.custom_design.quantity" type="number" min="1" class="py-3 px-4 bg-gray-900 block w-[5rem] border-x border-white text-sm focus:outline-0 focus:ring-0 disabled:pointer-events-none">
									<div class="flex h-[3rem]">
										<div @click="quotationData.landing_page_customization.custom_design.quantity > 1 ? quotationData.landing_page_customization.custom_design.quantity-- : null; calculate();" :class="quotationData.landing_page_customization.custom_design.quantity==1?'opacity-50':''" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:minus"></Icon></div>
										<div @click="quotationData.landing_page_customization.custom_design.quantity++; calculate()" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:plus"></Icon></div>
									</div>
								</div>
								<div :class="quotationData.landing_page_customization.custom_design.dropdown?'h-fit pt-3 pb-2 opacity-100':'h-0 opacity-0'" class="transition-all duration-300 border border-gray-500 border-t-0 bg-gray-800 px-4 rounded-b-lg mt-[-0.3rem] z-[9] overflow-clip">
									<div class="flex justify-between items-center w-full text-lg">
										<div class="">RM{{ quotationData.landing_page_customization.custom_design.price }}</div>
									</div>
									<div class="w-full text-sm mt-1 text-gray-300">
										<p>If you don't have your own design, the developer will charge you this option for better UI/UX experience.</p>
										<p class="mt-1">Deselecting this requires provided design to the developer.</p>
									</div>
								</div>
							</div> -->
		
							<div class="flex flex-col w-full">
								<div class="flex relative z-10 items-center bg-gray-800 border border-white rounded-lg overflow-clip">
									<input @change="calculate"  v-model="quotationData.landing_page_customization.maintenance.checked" type="checkbox" id="section" class="hidden" >
									<div 
										@click="quotationData.landing_page_customization.maintenance.checked=!quotationData.landing_page_customization.maintenance.checked; calculate();"
										:class="quotationData.landing_page_customization.maintenance.checked?'bg-blue-500':'bg-gray-900'" 
										class="w-8 h-12 border-r border-white cursor-pointer me-3"
									></div>
									<div @click="quotationData.landing_page_customization.maintenance.dropdown=!quotationData.landing_page_customization.maintenance.dropdown" class="grow text-md cursor-pointer select-none me-3 hover:opacity-75">Maintenance</div>
									<input @change="calculate" v-model="quotationData.landing_page_customization.maintenance.quantity" type="number" min="1" class="py-3 px-4 bg-gray-900 block w-[5rem] border-x border-white text-sm focus:outline-0 focus:ring-0 disabled:pointer-events-none">
									<div class="flex h-[3rem]">
										<div @click="quotationData.landing_page_customization.maintenance.quantity > 1 ? quotationData.landing_page_customization.maintenance.quantity-- : null; calculate();" :class="quotationData.landing_page_customization.maintenance.quantity==1?'opacity-50':''" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:minus"></Icon></div>
										<div @click="quotationData.landing_page_customization.maintenance.quantity++; calculate()" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:plus"></Icon></div>
									</div>
								</div>
								<div :class="quotationData.landing_page_customization.maintenance.dropdown?'h-fit pt-3 pb-2 opacity-100':'h-0 opacity-0'" class="transition-all duration-300 border border-gray-500 border-t-0 bg-gray-800 px-4 rounded-b-lg mt-[-0.3rem] z-[9] overflow-clip">
									<div class="flex justify-between items-center w-full text-lg">
										<div class="">{{ quotationData.landing_page_customization.maintenance.duration }} days</div>
										<div class="">RM{{ quotationData.landing_page_customization.maintenance.price }}</div>
									</div>
									<div class="w-full text-sm mt-1 text-gray-300">
										This option only applies after the website is published.
										Applies per page.
									</div>
								</div>
							</div>
						</div>
					</div>

					<div v-if="quotationData.custom.checked">
						<h1 class="text-xl font-semibold mt-8 text-[#FFDD53]">Custom Web Customizations</h1>
						<h1 class="text-xl font-semibold mt-5">Admin Dashboard <span class="text-[#F8EFC9]">+RM{{ quotationData.custom_web_customization.admin_dashboard.price }}</span></h1>
						<div class="mt-3 grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-5">
							
							<div class="flex flex-col w-full">
								<div class="flex relative z-10 items-center bg-gray-800 border border-white rounded-lg overflow-clip">
									<input @change="calculate"  v-model="quotationData.custom_web_customization.counting.checked" type="checkbox" id="section" class="hidden" >
									<div 
										@click="quotationData.custom_web_customization.counting.checked=!quotationData.custom_web_customization.counting.checked; calculate();"
										:class="quotationData.custom_web_customization.counting.checked?'bg-blue-500':'bg-gray-900'" 
										class="w-8 h-12 border-r border-white cursor-pointer me-3"
									></div>
									<div @click="quotationData.custom_web_customization.counting.dropdown=!quotationData.custom_web_customization.counting.dropdown" class="grow text-md cursor-pointer select-none me-3 hover:opacity-75">Counting Analytics</div>
									<input @change="calculate" v-model="quotationData.custom_web_customization.counting.quantity" type="number" min="1" class="py-3 px-4 bg-gray-900 block w-[5rem] border-x border-white text-sm focus:outline-0 focus:ring-0 disabled:pointer-events-none">
									<div class="flex h-[3rem]">
										<div @click="quotationData.custom_web_customization.counting.quantity > 1 ? quotationData.custom_web_customization.counting.quantity-- : null; calculate();" :class="quotationData.custom_web_customization.counting.quantity==1?'opacity-50':''" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:minus"></Icon></div>
										<div @click="quotationData.custom_web_customization.counting.quantity++; calculate()" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:plus"></Icon></div>
									</div>
								</div>
								<div :class="quotationData.custom_web_customization.counting.dropdown?'h-fit pt-3 pb-2 opacity-100':'h-0 opacity-0'" class="transition-all duration-300 border border-gray-500 border-t-0 bg-gray-800 px-4 rounded-b-lg mt-[-0.3rem] z-[9] overflow-clip">
									<div class="flex justify-between items-center w-full text-lg">
										<div class="">{{ quotationData.custom_web_customization.counting.duration }} days</div>
										<div class="">RM{{ quotationData.custom_web_customization.counting.price }}</div>
									</div>
									<div class="w-full text-sm mt-1 text-gray-300">
										Applies for one calculation display.
									</div>
								</div>
							</div>

							<div class="flex flex-col w-full">
								<div class="flex relative z-10 items-center bg-gray-800 border border-white rounded-lg overflow-clip">
									<input @change="calculate"  v-model="quotationData.custom_web_customization.graph.checked" type="checkbox" id="section" class="hidden" >
									<div 
										@click="quotationData.custom_web_customization.graph.checked=!quotationData.custom_web_customization.graph.checked; calculate();"
										:class="quotationData.custom_web_customization.graph.checked?'bg-blue-500':'bg-gray-900'" 
										class="w-8 h-12 border-r border-white cursor-pointer me-3"
									></div>
									<div @click="quotationData.custom_web_customization.graph.dropdown=!quotationData.custom_web_customization.graph.dropdown" class="grow text-md cursor-pointer select-none me-3 hover:opacity-75">Graph Analytics</div>
									<input @change="calculate" v-model="quotationData.custom_web_customization.graph.quantity" type="number" min="1" class="py-3 px-4 bg-gray-900 block w-[5rem] border-x border-white text-sm focus:outline-0 focus:ring-0 disabled:pointer-events-none">
									<div class="flex h-[3rem]">
										<div @click="quotationData.custom_web_customization.graph.quantity > 1 ? quotationData.custom_web_customization.graph.quantity-- : null; calculate();" :class="quotationData.custom_web_customization.graph.quantity==1?'opacity-50':''" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:minus"></Icon></div>
										<div @click="quotationData.custom_web_customization.graph.quantity++; calculate()" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:plus"></Icon></div>
									</div>
								</div>
								<div :class="quotationData.custom_web_customization.graph.dropdown?'h-fit pt-3 pb-2 opacity-100':'h-0 opacity-0'" class="transition-all duration-300 border border-gray-500 border-t-0 bg-gray-800 px-4 rounded-b-lg mt-[-0.3rem] z-[9] overflow-clip">
									<div class="flex justify-between items-center w-full text-lg">
										<div class="">{{ quotationData.custom_web_customization.graph.duration }} days</div>
										<div class="">RM{{ quotationData.custom_web_customization.graph.price }}</div>
									</div>
								</div>
							</div>
						</div>

						<h1 class="text-xl font-semibold mt-8">Add Ons</h1>
						<div class="mt-3 grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-5">

							<div class="flex flex-col w-full">
								<div class="flex relative z-10 items-center bg-gray-800 border border-white rounded-lg overflow-clip">
									<input @change="calculate"  v-model="quotationData.custom_web_customization.crud_basic.checked" type="checkbox" id="section" class="hidden" >
									<div 
										@click="quotationData.custom_web_customization.crud_basic.checked=!quotationData.custom_web_customization.crud_basic.checked; calculate();"
										:class="quotationData.custom_web_customization.crud_basic.checked?'bg-blue-500':'bg-gray-900'" 
										class="w-8 h-12 border-r border-white cursor-pointer me-3"
									></div>
									<div @click="quotationData.custom_web_customization.crud_basic.dropdown=!quotationData.custom_web_customization.crud_basic.dropdown" class="grow text-md cursor-pointer select-none me-3 hover:opacity-75">CRUD Basic</div>
									<input @change="calculate" v-model="quotationData.custom_web_customization.crud_basic.quantity" type="number" min="1" class="py-3 px-4 bg-gray-900 block w-[5rem] border-x border-white text-sm focus:outline-0 focus:ring-0 disabled:pointer-events-none">
									<div class="flex h-[3rem]">
										<div @click="quotationData.custom_web_customization.crud_basic.quantity > 1 ? quotationData.custom_web_customization.crud_basic.quantity-- : null; calculate();" :class="quotationData.custom_web_customization.crud_basic.quantity==1?'opacity-50':''" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:minus"></Icon></div>
										<div @click="quotationData.custom_web_customization.crud_basic.quantity++; calculate()" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:plus"></Icon></div>
									</div>
								</div>
								<div :class="quotationData.custom_web_customization.crud_basic.dropdown?'h-fit pt-3 pb-2 opacity-100':'h-0 opacity-0'" class="transition-all duration-300 border border-gray-500 border-t-0 bg-gray-800 px-4 rounded-b-lg mt-[-0.3rem] z-[9] overflow-clip">
									<div class="flex justify-between items-center w-full text-lg">
										<div class="">{{ quotationData.custom_web_customization.crud_basic.duration }} days</div>
										<div class="">RM{{ quotationData.custom_web_customization.crud_basic.price }}</div>
									</div>
									<div class="w-full text-sm mt-1 text-gray-300">
										<ul class="list-disc list-inside">
											<li>3 Pages (Create Page, Edit Page, View Page)</li>
											<li>Basic Styling</li>
											<li>No JavaScript</li>
										</ul>
									</div>
								</div>
							</div>
		
							<div class="flex flex-col w-full">
								<div class="flex relative z-10 items-center bg-gray-800 border border-white rounded-lg overflow-clip">
									<input @change="calculate"  v-model="quotationData.custom_web_customization.crud_advanced.checked" type="checkbox" id="section" class="hidden" >
									<div 
										@click="quotationData.custom_web_customization.crud_advanced.checked=!quotationData.custom_web_customization.crud_advanced.checked; calculate();"
										:class="quotationData.custom_web_customization.crud_advanced.checked?'bg-blue-500':'bg-gray-900'" 
										class="w-8 h-12 border-r border-white cursor-pointer me-3"
									></div>
									<div @click="quotationData.custom_web_customization.crud_advanced.dropdown=!quotationData.custom_web_customization.crud_advanced.dropdown" class="grow text-md cursor-pointer select-none me-3 hover:opacity-75">CRUD Advanced</div>
									<input @change="calculate" v-model="quotationData.custom_web_customization.crud_advanced.quantity" type="number" min="1" class="py-3 px-4 bg-gray-900 block w-[5rem] border-x border-white text-sm focus:outline-0 focus:ring-0 disabled:pointer-events-none">
									<div class="flex h-[3rem]">
										<div @click="quotationData.custom_web_customization.crud_advanced.quantity > 1 ? quotationData.custom_web_customization.crud_advanced.quantity-- : null; calculate();" :class="quotationData.custom_web_customization.crud_advanced.quantity==1?'opacity-50':''" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:minus"></Icon></div>
										<div @click="quotationData.custom_web_customization.crud_advanced.quantity++; calculate()" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:plus"></Icon></div>
									</div>
								</div>
								<div :class="quotationData.custom_web_customization.crud_advanced.dropdown?'h-fit pt-3 pb-2 opacity-100':'h-0 opacity-0'" class="transition-all duration-300 border border-gray-500 border-t-0 bg-gray-800 px-4 rounded-b-lg mt-[-0.3rem] z-[9] overflow-clip">
									<div class="flex justify-between items-center w-full text-lg">
										<div class="">{{ quotationData.custom_web_customization.crud_advanced.duration }} days</div>
										<div class="">RM{{ quotationData.custom_web_customization.crud_advanced.price }}</div>
									</div>
									<div class="w-full text-sm mt-1 text-gray-300">
										<ul class="list-disc list-inside">
											<li>3 Pages (Create Page, Edit Page, View Page)</li>
											<li>Advanced Styling</li>
											<li>Interactive</li>
											<li>JavaScript</li>
											<li>Logics</li>
											<li>Validation</li>
										</ul>
									</div>
								</div>
							</div>
		
							<div class="flex flex-col w-full">
								<div class="flex relative z-10 items-center bg-gray-800 border border-white rounded-lg overflow-clip">
									<input @change="calculate"  v-model="quotationData.custom_web_customization.crud_complex.checked" type="checkbox" id="section" class="hidden" >
									<div 
										@click="quotationData.custom_web_customization.crud_complex.checked=!quotationData.custom_web_customization.crud_complex.checked; calculate();"
										:class="quotationData.custom_web_customization.crud_complex.checked?'bg-blue-500':'bg-gray-900'" 
										class="w-8 h-12 border-r border-white cursor-pointer me-3"
									></div>
									<div @click="quotationData.custom_web_customization.crud_complex.dropdown=!quotationData.custom_web_customization.crud_complex.dropdown" class="grow text-md cursor-pointer select-none me-3 hover:opacity-75">CRUD Complex</div>
									<input @change="calculate" v-model="quotationData.custom_web_customization.crud_complex.quantity" type="number" min="1" class="py-3 px-4 bg-gray-900 block w-[5rem] border-x border-white text-sm focus:outline-0 focus:ring-0 disabled:pointer-events-none">
									<div class="flex h-[3rem]">
										<div @click="quotationData.custom_web_customization.crud_complex.quantity > 1 ? quotationData.custom_web_customization.crud_complex.quantity-- : null; calculate();" :class="quotationData.custom_web_customization.crud_complex.quantity==1?'opacity-50':''" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:minus"></Icon></div>
										<div @click="quotationData.custom_web_customization.crud_complex.quantity++; calculate()" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:plus"></Icon></div>
									</div>
								</div>
								<div :class="quotationData.custom_web_customization.crud_complex.dropdown?'h-fit pt-3 pb-2 opacity-100':'h-0 opacity-0'" class="transition-all duration-300 border border-gray-500 border-t-0 bg-gray-800 px-4 rounded-b-lg mt-[-0.3rem] z-[9] overflow-clip">
									<div class="flex justify-between items-center w-full text-lg">
										<div class="">{{ quotationData.custom_web_customization.crud_complex.duration }} days</div>
										<div class="">RM{{ quotationData.custom_web_customization.crud_complex.price }}</div>
									</div>
									<div class="w-full text-sm mt-1 text-gray-300">
										<ul class="list-disc list-inside">
											<li>3 Pages (Create Page, Edit Page, View Page)</li>
											<li>Advanced Styling</li>
											<li>Interactive</li>
											<li>JavaScript</li>
											<li>Logics</li>
											<li>Validation</li>
											<li>Multiple Module inside a module</li>
										</ul>
									</div>
								</div>
							</div>
		
							<div class="flex flex-col w-full">
								<div class="flex relative z-10 items-center bg-gray-800 border border-white rounded-lg overflow-clip">
									<input @change="calculate"  v-model="quotationData.custom_web_customization.page_basic.checked" type="checkbox" id="section" class="hidden" >
									<div 
										@click="quotationData.custom_web_customization.page_basic.checked=!quotationData.custom_web_customization.page_basic.checked; calculate();"
										:class="quotationData.custom_web_customization.page_basic.checked?'bg-blue-500':'bg-gray-900'" 
										class="w-8 h-12 border-r border-white cursor-pointer me-3"
									></div>
									<div @click="quotationData.custom_web_customization.page_basic.dropdown=!quotationData.custom_web_customization.page_basic.dropdown" class="grow text-md cursor-pointer select-none me-3 hover:opacity-75">Page Basic</div>
									<input @change="calculate" v-model="quotationData.custom_web_customization.page_basic.quantity" type="number" min="1" class="py-3 px-4 bg-gray-900 block w-[5rem] border-x border-white text-sm focus:outline-0 focus:ring-0 disabled:pointer-events-none">
									<div class="flex h-[3rem]">
										<div @click="quotationData.custom_web_customization.page_basic.quantity > 1 ? quotationData.custom_web_customization.page_basic.quantity-- : null; calculate();" :class="quotationData.custom_web_customization.page_basic.quantity==1?'opacity-50':''" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:minus"></Icon></div>
										<div @click="quotationData.custom_web_customization.page_basic.quantity++; calculate()" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:plus"></Icon></div>
									</div>
								</div>
								<div :class="quotationData.custom_web_customization.page_basic.dropdown?'h-fit pt-3 pb-2 opacity-100':'h-0 opacity-0'" class="transition-all duration-300 border border-gray-500 border-t-0 bg-gray-800 px-4 rounded-b-lg mt-[-0.3rem] z-[9] overflow-clip">
									<div class="flex justify-between items-center w-full text-lg">
										<div class="">{{ quotationData.custom_web_customization.page_basic.duration }} days</div>
										<div class="">RM{{ quotationData.custom_web_customization.page_basic.price }}</div>
									</div>
									<div class="w-full text-sm mt-1 text-gray-300">
										<ul class="list-disc list-inside">
											<li>Basic Styling</li>
											<li>No JavaScript</li>
										</ul>
									</div>
								</div>
							</div>
		
							<div class="flex flex-col w-full">
								<div class="flex relative z-10 items-center bg-gray-800 border border-white rounded-lg overflow-clip">
									<input @change="calculate"  v-model="quotationData.custom_web_customization.page_advanced.checked" type="checkbox" id="section" class="hidden" >
									<div 
										@click="quotationData.custom_web_customization.page_advanced.checked=!quotationData.custom_web_customization.page_advanced.checked; calculate();"
										:class="quotationData.custom_web_customization.page_advanced.checked?'bg-blue-500':'bg-gray-900'" 
										class="w-8 h-12 border-r border-white cursor-pointer me-3"
									></div>
									<div @click="quotationData.custom_web_customization.page_advanced.dropdown=!quotationData.custom_web_customization.page_advanced.dropdown" class="grow text-md cursor-pointer select-none me-3 hover:opacity-75">Page Advanced</div>
									<input @change="calculate" v-model="quotationData.custom_web_customization.page_advanced.quantity" type="number" min="1" class="py-3 px-4 bg-gray-900 block w-[5rem] border-x border-white text-sm focus:outline-0 focus:ring-0 disabled:pointer-events-none">
									<div class="flex h-[3rem]">
										<div @click="quotationData.custom_web_customization.page_advanced.quantity > 1 ? quotationData.custom_web_customization.page_advanced.quantity-- : null; calculate();" :class="quotationData.custom_web_customization.page_advanced.quantity==1?'opacity-50':''" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:minus"></Icon></div>
										<div @click="quotationData.custom_web_customization.page_advanced.quantity++; calculate()" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:plus"></Icon></div>
									</div>
								</div>
								<div :class="quotationData.custom_web_customization.page_advanced.dropdown?'h-fit pt-3 pb-2 opacity-100':'h-0 opacity-0'" class="transition-all duration-300 border border-gray-500 border-t-0 bg-gray-800 px-4 rounded-b-lg mt-[-0.3rem] z-[9] overflow-clip">
									<div class="flex justify-between items-center w-full text-lg">
										<div class="">{{ quotationData.custom_web_customization.page_advanced.duration }} days</div>
										<div class="">RM{{ quotationData.custom_web_customization.page_advanced.price }}</div>
									</div>
									<div class="w-full text-sm mt-1 text-gray-300">
										<ul class="list-disc list-inside">
											<li>Advanced Styling</li>
											<li>Interactive</li>
											<li>JavaScript</li>
											<li>Logics</li>
											<li>Validation</li>
										</ul>
									</div>
								</div>
							</div>
		
							<div class="flex flex-col w-full">
								<div class="flex relative z-10 items-center bg-gray-800 border border-white rounded-lg overflow-clip">
									<input @change="calculate"  v-model="quotationData.custom_web_customization.page_complex.checked" type="checkbox" id="section" class="hidden" >
									<div 
										@click="quotationData.custom_web_customization.page_complex.checked=!quotationData.custom_web_customization.page_complex.checked; calculate();"
										:class="quotationData.custom_web_customization.page_complex.checked?'bg-blue-500':'bg-gray-900'" 
										class="w-8 h-12 border-r border-white cursor-pointer me-3"
									></div>
									<div @click="quotationData.custom_web_customization.page_complex.dropdown=!quotationData.custom_web_customization.page_complex.dropdown" class="grow text-md cursor-pointer select-none me-3 hover:opacity-75">Page Complex</div>
									<input @change="calculate" v-model="quotationData.custom_web_customization.page_complex.quantity" type="number" min="1" class="py-3 px-4 bg-gray-900 block w-[5rem] border-x border-white text-sm focus:outline-0 focus:ring-0 disabled:pointer-events-none">
									<div class="flex h-[3rem]">
										<div @click="quotationData.custom_web_customization.page_complex.quantity > 1 ? quotationData.custom_web_customization.page_complex.quantity-- : null; calculate();" :class="quotationData.custom_web_customization.page_complex.quantity==1?'opacity-50':''" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:minus"></Icon></div>
										<div @click="quotationData.custom_web_customization.page_complex.quantity++; calculate()" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:plus"></Icon></div>
									</div>
								</div>
								<div :class="quotationData.custom_web_customization.page_complex.dropdown?'h-fit pt-3 pb-2 opacity-100':'h-0 opacity-0'" class="transition-all duration-300 border border-gray-500 border-t-0 bg-gray-800 px-4 rounded-b-lg mt-[-0.3rem] z-[9] overflow-clip">
									<div class="flex justify-between items-center w-full text-lg">
										<div class="">{{ quotationData.custom_web_customization.page_complex.duration }} days</div>
										<div class="">RM{{ quotationData.custom_web_customization.page_complex.price }}</div>
									</div>
									<div class="w-full text-sm mt-1 text-gray-300">
										<ul class="list-disc list-inside">
											<li>Advanced Styling</li>
											<li>Interactive</li>
											<li>JavaScript</li>
											<li>Logics</li>
											<li>Validation</li>
											<li>Multiple Module inside a module</li>
										</ul>
									</div>
								</div>
							</div>
						</div>

						<h1 class="text-xl font-semibold mt-8">System Features</h1>
						<div class="mt-3 grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-5">
							<div class="flex flex-col w-full">
								<div class="flex relative z-10 items-center bg-gray-800 border border-white rounded-lg overflow-clip">
									<input @change="calculate"  v-model="quotationData.custom_web_customization.third_party.checked" type="checkbox" id="section" class="hidden" >
									<div 
										@click="quotationData.custom_web_customization.third_party.checked=!quotationData.custom_web_customization.third_party.checked; calculate();"
										:class="quotationData.custom_web_customization.third_party.checked?'bg-blue-500':'bg-gray-900'" 
										class="w-8 h-12 border-r border-white cursor-pointer me-3"
									></div>
									<div @click="quotationData.custom_web_customization.third_party.dropdown=!quotationData.custom_web_customization.third_party.dropdown" class="grow text-md cursor-pointer select-none me-3 hover:opacity-75">Third Party API Integration</div>
									<input @change="calculate" v-model="quotationData.custom_web_customization.third_party.quantity" type="number" min="1" class="py-3 px-4 bg-gray-900 block w-[5rem] border-x border-white text-sm focus:outline-0 focus:ring-0 disabled:pointer-events-none">
									<div class="flex h-[3rem]">
										<div @click="quotationData.custom_web_customization.third_party.quantity > 1 ? quotationData.custom_web_customization.third_party.quantity-- : null; calculate();" :class="quotationData.custom_web_customization.third_party.quantity==1?'opacity-50':''" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:minus"></Icon></div>
										<div @click="quotationData.custom_web_customization.third_party.quantity++; calculate()" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:plus"></Icon></div>
									</div>
								</div>
								<div :class="quotationData.custom_web_customization.third_party.dropdown?'h-fit pt-3 pb-2 opacity-100':'h-0 opacity-0'" class="transition-all duration-300 border border-gray-500 border-t-0 bg-gray-800 px-4 rounded-b-lg mt-[-0.3rem] z-[9] overflow-clip">
									<div class="flex justify-between items-center w-full text-lg">
										<div class="">{{ quotationData.custom_web_customization.third_party.duration }} days</div>
										<div class="">RM{{ quotationData.custom_web_customization.third_party.price }}</div>
									</div>
									<div class="w-full text-sm mt-1 text-gray-300">
										<ul class="list-disc list-inside">
											<li>Payment</li>
										</ul>
									</div>
								</div>
							</div>
		
							<div class="flex flex-col w-full">
								<div class="flex relative z-10 items-center bg-gray-800 border border-white rounded-lg overflow-clip">
									<input @change="calculate"  v-model="quotationData.custom_web_customization.real_time_api.checked" type="checkbox" id="section" class="hidden" >
									<div 
										@click="quotationData.custom_web_customization.real_time_api.checked=!quotationData.custom_web_customization.real_time_api.checked; calculate();"
										:class="quotationData.custom_web_customization.real_time_api.checked?'bg-blue-500':'bg-gray-900'" 
										class="w-8 h-12 border-r border-white cursor-pointer me-3"
									></div>
									<div @click="quotationData.custom_web_customization.real_time_api.dropdown=!quotationData.custom_web_customization.real_time_api.dropdown" class="grow text-md cursor-pointer select-none me-3 hover:opacity-75">Custom Real Time API</div>
									<input @change="calculate" v-model="quotationData.custom_web_customization.real_time_api.quantity" type="number" min="1" class="py-3 px-4 bg-gray-900 block w-[5rem] border-x border-white text-sm focus:outline-0 focus:ring-0 disabled:pointer-events-none">
									<div class="flex h-[3rem]">
										<div @click="quotationData.custom_web_customization.real_time_api.quantity > 1 ? quotationData.custom_web_customization.real_time_api.quantity-- : null; calculate();" :class="quotationData.custom_web_customization.real_time_api.quantity==1?'opacity-50':''" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:minus"></Icon></div>
										<div @click="quotationData.custom_web_customization.real_time_api.quantity++; calculate()" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:plus"></Icon></div>
									</div>
								</div>
								<div :class="quotationData.custom_web_customization.real_time_api.dropdown?'h-fit pt-3 pb-2 opacity-100':'h-0 opacity-0'" class="transition-all duration-300 border border-gray-500 border-t-0 bg-gray-800 px-4 rounded-b-lg mt-[-0.3rem] z-[9] overflow-clip">
									<div class="flex justify-between items-center w-full text-lg">
										<div class="">{{ quotationData.custom_web_customization.real_time_api.duration }} days</div>
										<div class="">RM{{ quotationData.custom_web_customization.real_time_api.price }}</div>
									</div>
									<div class="w-full text-sm mt-1 text-gray-300">
										<ul class="list-disc list-inside">
											<li>Chatting</li>
											<li>Notification</li>
										</ul>
									</div>
								</div>
							</div>
		
							<div class="flex flex-col w-full">
								<div class="flex relative z-10 items-center bg-gray-800 border border-white rounded-lg overflow-clip">
									<input @change="calculate"  v-model="quotationData.custom_web_customization.payment_gateway.checked" type="checkbox" id="section" class="hidden" >
									<div 
										@click="quotationData.custom_web_customization.payment_gateway.checked=!quotationData.custom_web_customization.payment_gateway.checked; calculate();"
										:class="quotationData.custom_web_customization.payment_gateway.checked?'bg-blue-500':'bg-gray-900'" 
										class="w-8 h-12 border-r border-white cursor-pointer me-3"
									></div>
									<div @click="quotationData.custom_web_customization.payment_gateway.dropdown=!quotationData.custom_web_customization.payment_gateway.dropdown" class="grow text-md cursor-pointer select-none me-3 hover:opacity-75">Payment Gateway</div>
									<!-- <input @change="calculate" v-model="quotationData.custom_web_customization.payment_gateway.quantity" type="number" min="1" class="py-3 px-4 bg-gray-900 block w-[5rem] border-x border-white text-sm focus:outline-0 focus:ring-0 disabled:pointer-events-none">
									<div class="flex h-[3rem]">
										<div @click="quotationData.custom_web_customization.payment_gateway.quantity > 1 ? quotationData.custom_web_customization.payment_gateway.quantity-- : null; calculate();" :class="quotationData.custom_web_customization.payment_gateway.quantity==1?'opacity-50':''" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:minus"></Icon></div>
										<div @click="quotationData.custom_web_customization.payment_gateway.quantity++; calculate()" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:plus"></Icon></div>
									</div> -->
								</div>
								<div :class="quotationData.custom_web_customization.payment_gateway.dropdown?'h-fit pt-3 pb-2 opacity-100':'h-0 opacity-0'" class="transition-all duration-300 border border-gray-500 border-t-0 bg-gray-800 px-4 rounded-b-lg mt-[-0.3rem] z-[9] overflow-clip">
									<div class="flex justify-between items-center w-full text-lg">
										<div class="">{{ quotationData.custom_web_customization.payment_gateway.duration }} days</div>
										<div class="">RM{{ quotationData.custom_web_customization.payment_gateway.price }}</div>
									</div>
									<div class="w-full text-sm mt-1 text-gray-300">
										<ul class="list-disc list-inside">
											<li>Stripe</li>
											<li>Chip In</li>
										</ul>
									</div>
								</div>
							</div>

							<div class="flex flex-col w-full">
								<div class="flex relative z-10 items-center bg-gray-800 border border-white rounded-lg overflow-clip">
									<input @change="calculate"  v-model="quotationData.custom_web_customization.animation.checked" type="checkbox" id="section" class="hidden" >
									<div 
										@click="quotationData.custom_web_customization.animation.checked=!quotationData.custom_web_customization.animation.checked; calculate();"
										:class="quotationData.custom_web_customization.animation.checked?'bg-blue-500':'bg-gray-900'" 
										class="w-8 h-12 border-r border-white cursor-pointer me-3"
									></div>
									<div @click="quotationData.custom_web_customization.animation.dropdown=!quotationData.custom_web_customization.animation.dropdown" class="grow text-md cursor-pointer select-none me-3 hover:opacity-75">Transition and Animation</div>
									<input @change="calculate" v-model="quotationData.custom_web_customization.animation.quantity" type="number" min="1" class="py-3 px-4 bg-gray-900 block w-[5rem] border-x border-white text-sm focus:outline-0 focus:ring-0 disabled:pointer-events-none">
									<div class="flex h-[3rem]">
										<div @click="quotationData.custom_web_customization.animation.quantity > 1 ? quotationData.custom_web_customization.animation.quantity-- : null; calculate();" :class="quotationData.custom_web_customization.animation.quantity==1?'opacity-50':''" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:minus"></Icon></div>
										<div @click="quotationData.custom_web_customization.animation.quantity++; calculate()" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:plus"></Icon></div>
									</div>
								</div>
								<div :class="quotationData.custom_web_customization.animation.dropdown?'h-fit pt-3 pb-2 opacity-100':'h-0 opacity-0'" class="transition-all duration-300 border border-gray-500 border-t-0 bg-gray-800 px-4 rounded-b-lg mt-[-0.3rem] z-[9] overflow-clip">
									<div class="flex justify-between items-center w-full text-lg">
										<div class="">{{ quotationData.custom_web_customization.animation.duration }} days</div>
										<div class="">RM{{ quotationData.custom_web_customization.animation.price }}</div>
									</div>
									<div class="w-full text-sm mt-1 text-gray-300">
										Applies per page
									</div>
								</div>
							</div>
		
							<div class="flex flex-col w-full">
								<div class="flex relative z-10 items-center bg-gray-800 border border-white rounded-lg overflow-clip">
									<input @change="calculate"  v-model="quotationData.custom_web_customization.responsive.checked" type="checkbox" id="section" class="hidden" >
									<div 
										@click="quotationData.custom_web_customization.responsive.checked=!quotationData.custom_web_customization.responsive.checked; calculate();"
										:class="quotationData.custom_web_customization.responsive.checked?'bg-blue-500':'bg-gray-900'" 
										class="w-8 h-12 border-r border-white cursor-pointer me-3"
									></div>
									<div @click="quotationData.custom_web_customization.responsive.dropdown=!quotationData.custom_web_customization.responsive.dropdown" class="grow text-md cursor-pointer select-none me-3 hover:opacity-75">Responsive Design</div>
									<input @change="calculate" v-model="quotationData.custom_web_customization.responsive.quantity" type="number" min="1" class="py-3 px-4 bg-gray-900 block w-[5rem] border-x border-white text-sm focus:outline-0 focus:ring-0 disabled:pointer-events-none">
									<div class="flex h-[3rem]">
										<div @click="quotationData.custom_web_customization.responsive.quantity > 1 ? quotationData.custom_web_customization.responsive.quantity-- : null; calculate();" :class="quotationData.custom_web_customization.responsive.quantity==1?'opacity-50':''" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:minus"></Icon></div>
										<div @click="quotationData.custom_web_customization.responsive.quantity++; calculate()" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:plus"></Icon></div>
									</div>
								</div>
								<div :class="quotationData.custom_web_customization.responsive.dropdown?'h-fit pt-3 pb-2 opacity-100':'h-0 opacity-0'" class="transition-all duration-300 border border-gray-500 border-t-0 bg-gray-800 px-4 rounded-b-lg mt-[-0.3rem] z-[9] overflow-clip">
									<div class="flex justify-between items-center w-full text-lg">
										<div class="">{{ quotationData.custom_web_customization.responsive.duration }} days</div>
										<div class="">RM{{ quotationData.custom_web_customization.responsive.price }}</div>
									</div>
									<div class="w-full text-sm mt-1 text-gray-300">
										Applies per page
									</div>
								</div>
							</div>
						</div>

						<h1 class="text-xl font-semibold mt-8">Service</h1>
						<div class="mt-3 grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-5">
							<div class="flex flex-col w-full">
								<div class="flex relative z-10 items-center bg-gray-800 border border-white rounded-lg overflow-clip">
									<input @change="calculate"  v-model="quotationData.custom_web_customization.revision.checked" type="checkbox" id="section" class="hidden" >
									<div 
										@click="quotationData.custom_web_customization.revision.checked=!quotationData.custom_web_customization.revision.checked; calculate();"
										:class="quotationData.custom_web_customization.revision.checked?'bg-blue-500':'bg-gray-900'" 
										class="w-8 h-12 border-r border-white cursor-pointer me-3"
									></div>
									<div @click="quotationData.custom_web_customization.revision.dropdown=!quotationData.custom_web_customization.revision.dropdown" class="grow text-md cursor-pointer select-none me-3 hover:opacity-75">Revision</div>
									<input @change="calculate" v-model="quotationData.custom_web_customization.revision.quantity" type="number" min="1" class="py-3 px-4 bg-gray-900 block w-[5rem] border-x border-white text-sm focus:outline-0 focus:ring-0 disabled:pointer-events-none">
									<div class="flex h-[3rem]">
										<div @click="quotationData.custom_web_customization.revision.quantity > 1 ? quotationData.custom_web_customization.revision.quantity-- : null; calculate();" :class="quotationData.custom_web_customization.revision.quantity==1?'opacity-50':''" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:minus"></Icon></div>
										<div @click="quotationData.custom_web_customization.revision.quantity++; calculate()" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:plus"></Icon></div>
									</div>
								</div>
								<div :class="quotationData.custom_web_customization.revision.dropdown?'h-fit pt-3 pb-2 opacity-100':'h-0 opacity-0'" class="transition-all duration-300 border border-gray-500 border-t-0 bg-gray-800 px-4 rounded-b-lg mt-[-0.3rem] z-[9] overflow-clip">
									<div class="flex justify-between items-center w-full text-lg">
										<div class="">{{ quotationData.custom_web_customization.revision.duration }} day</div>
										<div class="">RM{{ quotationData.custom_web_customization.revision.price }}</div>
									</div>
								</div>
							</div>
		
							<div class="flex flex-col w-full">
								<div class="flex relative z-10 items-center bg-gray-800 border border-white rounded-lg overflow-clip">
									<input @change="calculate"  v-model="quotationData.custom_web_customization.faster_delivery.checked" type="checkbox" id="section" class="hidden" >
									<div 
										@click="quotationData.custom_web_customization.faster_delivery.checked=!quotationData.custom_web_customization.faster_delivery.checked; calculate();"
										:class="quotationData.custom_web_customization.faster_delivery.checked?'bg-blue-500':'bg-gray-900'" 
										class="w-8 h-12 border-r border-white cursor-pointer me-3"
									></div>
									<div @click="quotationData.custom_web_customization.faster_delivery.dropdown=!quotationData.custom_web_customization.faster_delivery.dropdown" class="grow text-md cursor-pointer select-none me-3 hover:opacity-75">Faster Delivery</div>
									<input @change="calculate" v-model="quotationData.custom_web_customization.faster_delivery.quantity" type="number" min="1" class="py-3 px-4 bg-gray-900 block w-[5rem] border-x border-white text-sm focus:outline-0 focus:ring-0 disabled:pointer-events-none">
									<div class="flex h-[3rem]">
										<div @click="quotationData.custom_web_customization.faster_delivery.quantity > 1 ? quotationData.custom_web_customization.faster_delivery.quantity-- : null; calculate();" :class="quotationData.custom_web_customization.faster_delivery.quantity==1?'opacity-50':''" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:minus"></Icon></div>
										<div @click="quotationData.custom_web_customization.faster_delivery.quantity++; calculate()" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:plus"></Icon></div>
									</div>
								</div>
								<div :class="quotationData.custom_web_customization.faster_delivery.dropdown?'h-fit pt-3 pb-2 opacity-100':'h-0 opacity-0'" class="transition-all duration-300 border border-gray-500 border-t-0 bg-gray-800 px-4 rounded-b-lg mt-[-0.3rem] z-[9] overflow-clip">
									<div class="flex justify-between items-center w-full text-lg">
										<div class="">-{{ quotationData.custom_web_customization.faster_delivery.quantity * 3 }} days</div>
										<div class="">RM{{ quotationData.custom_web_customization.faster_delivery.price }}</div>
									</div>
								</div>
							</div>
		
							<div class="flex flex-col w-full">
								<div class="flex relative z-10 items-center bg-gray-800 border border-white rounded-lg overflow-clip">
									<input @change="calculate"  v-model="quotationData.custom_web_customization.hosting_setup.checked" type="checkbox" id="section" class="hidden" >
									<div 
										@click="quotationData.custom_web_customization.hosting_setup.checked=!quotationData.custom_web_customization.hosting_setup.checked; calculate();"
										:class="quotationData.custom_web_customization.hosting_setup.checked?'bg-blue-500':'bg-gray-900'" 
										class="w-8 h-12 border-r border-white cursor-pointer me-3"
									></div>
									<div @click="quotationData.custom_web_customization.hosting_setup.dropdown=!quotationData.custom_web_customization.hosting_setup.dropdown" class="grow text-md cursor-pointer select-none me-3 hover:opacity-75">Hosting Setup</div>
								</div>
								<div :class="quotationData.custom_web_customization.hosting_setup.dropdown?'h-fit pt-3 pb-2 opacity-100':'h-0 opacity-0'" class="transition-all duration-300 border border-gray-500 border-t-0 bg-gray-800 px-4 rounded-b-lg mt-[-0.3rem] z-[9] overflow-clip">
									<div class="flex justify-between items-center w-full text-lg">
										<div class="">{{ quotationData.custom_web_customization.hosting_setup.duration }} days</div>
										<div class="">RM{{ quotationData.custom_web_customization.hosting_setup.price }}</div>
									</div>
									<div class="w-full text-sm mt-1 text-gray-300">
										<p>Hosting payment will not be made by the developer, only deploying/setting the website into hosting to make it accessible online.</p>
										<p class="mt-1">Deselecting this option the developer will handout the website souce code instead.</p>
									</div>
								</div>
							</div>
		
							<div class="flex flex-col w-full">
								<div class="flex relative z-10 items-center bg-gray-800 border border-white rounded-lg overflow-clip">
									<input @change="calculate"  v-model="quotationData.custom_web_customization.custom_design.checked" type="checkbox" id="section" class="hidden" >
									<div 
										@click="quotationData.custom_web_customization.custom_design.checked=!quotationData.custom_web_customization.custom_design.checked; calculate();"
										:class="quotationData.custom_web_customization.custom_design.checked?'bg-blue-500':'bg-gray-900'" 
										class="w-8 h-12 border-r border-white cursor-pointer me-3"
									></div>
									<div @click="quotationData.custom_web_customization.custom_design.dropdown=!quotationData.custom_web_customization.custom_design.dropdown" class="grow text-md cursor-pointer select-none me-3 hover:opacity-75">Custom Design</div>
									<input @change="calculate" v-model="quotationData.custom_web_customization.custom_design.quantity" type="number" min="1" class="py-3 px-4 bg-gray-900 block w-[5rem] border-x border-white text-sm focus:outline-0 focus:ring-0 disabled:pointer-events-none">
									<div class="flex h-[3rem]">
										<div @click="quotationData.custom_web_customization.custom_design.quantity > 1 ? quotationData.custom_web_customization.custom_design.quantity-- : null; calculate();" :class="quotationData.custom_web_customization.custom_design.quantity==1?'opacity-50':''" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:minus"></Icon></div>
										<div @click="quotationData.custom_web_customization.custom_design.quantity++; calculate()" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:plus"></Icon></div>
									</div>
								</div>
								<div :class="quotationData.custom_web_customization.custom_design.dropdown?'h-fit pt-3 pb-2 opacity-100':'h-0 opacity-0'" class="transition-all duration-300 border border-gray-500 border-t-0 bg-gray-800 px-4 rounded-b-lg mt-[-0.3rem] z-[9] overflow-clip">
									<div class="flex justify-between items-center w-full text-lg">
										<div class="">RM{{ quotationData.custom_web_customization.custom_design.price }}</div>
									</div>
									<div class="w-full text-sm mt-1 text-gray-300">
										<p>If you don't have your own design, the developer will charge you this option for better UI/UX experience.</p>
										<p class="mt-1">Deselecting this requires provided design to the developer.</p>
									</div>
								</div>
							</div>
		
							<div class="flex flex-col w-full">
								<div class="flex relative z-10 items-center bg-gray-800 border border-white rounded-lg overflow-clip">
									<input @change="calculate"  v-model="quotationData.custom_web_customization.maintenance.checked" type="checkbox" id="section" class="hidden" >
									<div 
										@click="quotationData.custom_web_customization.maintenance.checked=!quotationData.custom_web_customization.maintenance.checked; calculate();"
										:class="quotationData.custom_web_customization.maintenance.checked?'bg-blue-500':'bg-gray-900'" 
										class="w-8 h-12 border-r border-white cursor-pointer me-3"
									></div>
									<div @click="quotationData.custom_web_customization.maintenance.dropdown=!quotationData.custom_web_customization.maintenance.dropdown" class="grow text-md cursor-pointer select-none me-3 hover:opacity-75">Maintenance</div>
									<input @change="calculate" v-model="quotationData.custom_web_customization.maintenance.quantity" type="number" min="1" class="py-3 px-4 bg-gray-900 block w-[5rem] border-x border-white text-sm focus:outline-0 focus:ring-0 disabled:pointer-events-none">
									<div class="flex h-[3rem]">
										<div @click="quotationData.custom_web_customization.maintenance.quantity > 1 ? quotationData.custom_web_customization.maintenance.quantity-- : null; calculate();" :class="quotationData.custom_web_customization.maintenance.quantity==1?'opacity-50':''" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:minus"></Icon></div>
										<div @click="quotationData.custom_web_customization.maintenance.quantity++; calculate()" class="w-[2rem] select-none flex justify-center items-center bg-gray-600 hover:bg-gray-700 cursor-pointer"><Icon class="text-[1rem]" icon="tabler:plus"></Icon></div>
									</div>
								</div>
								<div :class="quotationData.custom_web_customization.maintenance.dropdown?'h-fit pt-3 pb-2 opacity-100':'h-0 opacity-0'" class="transition-all duration-300 border border-gray-500 border-t-0 bg-gray-800 px-4 rounded-b-lg mt-[-0.3rem] z-[9] overflow-clip">
									<div class="flex justify-between items-center w-full text-lg">
										<div class="">{{ quotationData.custom_web_customization.maintenance.duration }} days</div>
										<div class="">RM{{ quotationData.custom_web_customization.maintenance.price }}</div>
									</div>
									<div class="w-full text-sm mt-1 text-gray-300">
										This option only applies after the website is published.
										Applies per page.
									</div>
								</div>
							</div>
						</div>

					</div>

					<div>
						<div class="flex items-center gap-3 mt-8">
							<h1 class="text-xl font-semibold text-[#FFDD53]">Full Statement</h1>
							<button @click="print" class="text-white hover:text-black hover:bg-white transition-colors flex items-center gap-2 border border-white py-2 px-4 rounded-xl">
								<Icon class="text-lg" icon="mdi:printer" />
								Print quotation
							</button>
							<button @click="depositLayoutActive=true; print();" class="text-white hover:text-black hover:bg-white transition-colors flex items-center gap-2 border border-white py-2 px-4 rounded-xl">
								<Icon class="text-lg" icon="mdi:printer" />
								Print deposit
							</button>
							<button @click="fullyPaidLayoutActive=true; print();" class="text-white hover:text-black hover:bg-white transition-colors flex items-center gap-2 border border-white py-2 px-4 rounded-xl">
								<Icon class="text-lg" icon="mdi:printer" />
								Print fully paid
							</button>
						</div>
						<p class="mt-2 text-sm">You can save this your quotation by clicking on print above and "choose save as PDF" or anything similar, then print.</p>
						<div class="relative mt-5 bg-white text-black font-[calibri] rounded-xl w-full px-8 py-6">
							<div class="w-full flex justify-between items-center">
								<h1 class="font-bold text-2xl">{{ depositLayoutActive||fullyPaidLayoutActive? 'Invoice' : 'Quotation Statement' }}</h1>
								<p><span class="font-semibold">Date Issued:</span> {{ currentDate }}</p>
							</div>

							<div v-if="!depositLayoutActive" class="mt-5 border rounded-xl border-gray-500">
								<div class="w-full p-3 rounded-t-xl text-gray-500 font-semibold bg-gray-100 flex items-center justify-between relative">
									<p class="w-2/4">Name</p>
									<p class="w-1/4">Price Per Item</p>
									<p class="w-1/4">Subtotal</p>
								</div>

								<div class="p-3">
									<p v-if="quotationData.landing_page.checked || quotationData.ecommerce.checked || quotationData.custom.checked" class="font-bold text-lg">Packages</p>
									<div class="flex w-full flex-col items center gap-1">
										<div v-if="quotationData.landing_page.checked" class="w-full flex items-center justify-between relative">
											<p class="w-2/4">Landing Page</p>
											<p class="w-1/4">RM {{ quotationData.landing_page.price }}</p>
											<p class="w-1/4">RM {{ quotationData.landing_page.price }}</p>
										</div>
										<div v-if="quotationData.ecommerce.checked" class="w-full flex items-center justify-between relative">
											<p class="w-2/4">Ecommerce</p>
											<p class="w-1/4">RM {{ quotationData.ecommerce.price }}</p>
											<p class="w-1/4">RM {{ quotationData.ecommerce.price }}</p>
										</div>
										<div v-if="quotationData.custom.checked" class="w-full flex items-center justify-between relative">
											<p class="w-2/4">Custom Web (Authentication and Profile Edit)</p>
											<p class="w-1/4">RM {{ quotationData.custom_web_customization.admin_dashboard.price }}</p>
											<p class="w-1/4">RM {{ quotationData.custom_web_customization.admin_dashboard.price }}</p>
										</div>
									</div>

									<div v-if="quotationData.landing_page.checked">
										<div class="mt-3 w-full h-[1px] bg-gray-300"></div>
										<p class="mt-3 font-bold text-lg">Landing Page Customization</p>
										<p class="font-semibold">Add Ons</p>
										<div v-if="quotationData.landing_page_customization.section.checked" class="w-full flex items-center justify-between relative">
											<p class="w-2/4">Section Basic (x{{ quotationData.landing_page_customization.section.quantity }})</p>
											<p class="w-1/4">RM {{ quotationData.landing_page_customization.section.price }}</p>
											<p class="w-1/4">RM {{ quotationData.landing_page_customization.section.price * quotationData.landing_page_customization.section.quantity }}</p>
										</div>
										<div v-if="quotationData.landing_page_customization.advanced_section.checked" class="w-full flex items-center justify-between relative">
											<p class="w-2/4">Section Advanced (x{{ quotationData.landing_page_customization.advanced_section.quantity }})</p>
											<p class="w-1/4">RM {{ quotationData.landing_page_customization.advanced_section.price }}</p>
											<p class="w-1/4">RM {{ quotationData.landing_page_customization.advanced_section.price * quotationData.landing_page_customization.advanced_section.quantity }}</p>
										</div>
										<div v-if="quotationData.landing_page_customization.complex_section.checked" class="w-full flex items-center justify-between relative">
											<p class="w-2/4">Section Complex (x{{ quotationData.landing_page_customization.complex_section.quantity }})</p>
											<p class="w-1/4">RM {{ quotationData.landing_page_customization.complex_section.price }}</p>
											<p class="w-1/4">RM {{ quotationData.landing_page_customization.complex_section.price * quotationData.landing_page_customization.complex_section.quantity }}</p>
										</div>

										<p class="font-semibold">System Features</p>
										<div v-if="quotationData.landing_page_customization.third_party.checked" class="w-full flex items-center justify-between relative">
											<p class="w-2/4">Third Party (x{{ quotationData.landing_page_customization.third_party.quantity }})</p>
											<p class="w-1/4">RM {{ quotationData.landing_page_customization.third_party.price }}</p>
											<p class="w-1/4">RM {{ quotationData.landing_page_customization.third_party.price * quotationData.landing_page_customization.third_party.quantity }}</p>
										</div>

										<p class="font-semibold">Service</p>
										<div v-if="quotationData.landing_page_customization.revision.checked" class="w-full flex items-center justify-between relative">
											<p class="w-2/4">Revision (x{{ quotationData.landing_page_customization.revision.quantity }})</p>
											<p class="w-1/4">RM {{ quotationData.landing_page_customization.revision.price }}</p>
											<p class="w-1/4">RM {{ quotationData.landing_page_customization.revision.price * quotationData.landing_page_customization.revision.quantity }}</p>
										</div>
										<div v-if="quotationData.landing_page_customization.faster_delivery.checked" class="w-full flex items-center justify-between relative">
											<p class="w-2/4">Faster Delivery (x{{ quotationData.landing_page_customization.faster_delivery.quantity }})</p>
											<p class="w-1/4">RM {{ quotationData.landing_page_customization.faster_delivery.price }}</p>
											<p class="w-1/4">RM {{ quotationData.landing_page_customization.faster_delivery.price * quotationData.landing_page_customization.faster_delivery.quantity }}</p>
										</div>
										<div v-if="quotationData.landing_page_customization.hosting_setup.checked" class="w-full flex items-center justify-between relative">
											<p class="w-2/4">Hosting Setup (x{{ quotationData.landing_page_customization.hosting_setup.quantity }})</p>
											<p class="w-1/4">RM {{ quotationData.landing_page_customization.hosting_setup.price }}</p>
											<p class="w-1/4">RM {{ quotationData.landing_page_customization.hosting_setup.price * quotationData.landing_page_customization.hosting_setup.quantity }}</p>
										</div>
										<div v-if="quotationData.landing_page_customization.custom_design.checked" class="w-full flex items-center justify-between relative">
											<p class="w-2/4">Custom Design (x{{ quotationData.landing_page_customization.custom_design.quantity }})</p>
											<p class="w-1/4">RM {{ quotationData.landing_page_customization.custom_design.price }}</p>
											<p class="w-1/4">RM {{ quotationData.landing_page_customization.custom_design.price * quotationData.landing_page_customization.custom_design.quantity }}</p>
										</div>
										<div v-if="quotationData.landing_page_customization.maintenance.checked" class="w-full flex items-center justify-between relative">
											<p class="w-2/4">Maintenance (x{{ quotationData.landing_page_customization.maintenance.quantity }})</p>
											<p class="w-1/4">RM {{ quotationData.landing_page_customization.maintenance.price }}</p>
											<p class="w-1/4">RM {{ quotationData.landing_page_customization.maintenance.price * quotationData.landing_page_customization.maintenance.quantity }}</p>
										</div>
									</div>

									<div v-if="quotationData.custom.checked">
										<div class="mt-3 w-full h-[1px] bg-gray-300"></div>
										<p class="mt-3 font-bold text-lg">Custom Web Customization</p>
										<p class="font-semibold">Admin Dashboard</p>
										<div v-if="quotationData.custom_web_customization.counting.checked" class="w-full flex items-center justify-between relative">
											<p class="w-2/4">Counting Analytics (x{{ quotationData.custom_web_customization.counting.quantity }})</p>
											<p class="w-1/4">RM {{ quotationData.custom_web_customization.counting.price }}</p>
											<p class="w-1/4">RM {{ quotationData.custom_web_customization.counting.price * quotationData.custom_web_customization.counting.quantity }}</p>
										</div>
										<div v-if="quotationData.custom_web_customization.graph.checked" class="w-full flex items-center justify-between relative">
											<p class="w-2/4">Graph (x{{ quotationData.custom_web_customization.graph.quantity }})</p>
											<p class="w-1/4">RM {{ quotationData.custom_web_customization.graph.price }}</p>
											<p class="w-1/4">RM {{ quotationData.custom_web_customization.graph.price * quotationData.custom_web_customization.graph.quantity }}</p>
										</div>
										
										<p class="font-semibold">Add Ons</p>
										<div v-if="quotationData.custom_web_customization.crud_basic.checked" class="w-full flex items-center justify-between relative">
											<p class="w-2/4">CRUD Basic (x{{ quotationData.custom_web_customization.crud_basic.quantity }})</p>
											<p class="w-1/4">RM {{ quotationData.custom_web_customization.crud_basic.price }}</p>
											<p class="w-1/4">RM {{ quotationData.custom_web_customization.crud_basic.price * quotationData.custom_web_customization.crud_basic.quantity }}</p>
										</div>
										<div v-if="quotationData.custom_web_customization.crud_advanced.checked" class="w-full flex items-center justify-between relative">
											<p class="w-2/4">CRUD Advanced (x{{ quotationData.custom_web_customization.crud_advanced.quantity }})</p>
											<p class="w-1/4">RM {{ quotationData.custom_web_customization.crud_advanced.price }}</p>
											<p class="w-1/4">RM {{ quotationData.custom_web_customization.crud_advanced.price * quotationData.custom_web_customization.crud_advanced.quantity }}</p>
										</div>
										<div v-if="quotationData.custom_web_customization.crud_complex.checked" class="w-full flex items-center justify-between relative">
											<p class="w-2/4">CRUD Complex (x{{ quotationData.custom_web_customization.crud_complex.quantity }})</p>
											<p class="w-1/4">RM {{ quotationData.custom_web_customization.crud_complex.price }}</p>
											<p class="w-1/4">RM {{ quotationData.custom_web_customization.crud_complex.price * quotationData.custom_web_customization.crud_complex.quantity }}</p>
										</div>
										<div v-if="quotationData.custom_web_customization.page_basic.checked" class="w-full flex items-center justify-between relative">
											<p class="w-2/4">Page Basic (x{{ quotationData.custom_web_customization.page_basic.quantity }})</p>
											<p class="w-1/4">RM {{ quotationData.custom_web_customization.page_basic.price }}</p>
											<p class="w-1/4">RM {{ quotationData.custom_web_customization.page_basic.price * quotationData.custom_web_customization.page_basic.quantity }}</p>
										</div>
										<div v-if="quotationData.custom_web_customization.page_advanced.checked" class="w-full flex items-center justify-between relative">
											<p class="w-2/4">Page Advanced (x{{ quotationData.custom_web_customization.page_advanced.quantity }})</p>
											<p class="w-1/4">RM {{ quotationData.custom_web_customization.page_advanced.price }}</p>
											<p class="w-1/4">RM {{ quotationData.custom_web_customization.page_advanced.price * quotationData.custom_web_customization.page_advanced.quantity }}</p>
										</div>
										<div v-if="quotationData.custom_web_customization.page_complex.checked" class="w-full flex items-center justify-between relative">
											<p class="w-2/4">Page Complex (x{{ quotationData.custom_web_customization.page_complex.quantity }})</p>
											<p class="w-1/4">RM {{ quotationData.custom_web_customization.page_complex.price }}</p>
											<p class="w-1/4">RM {{ quotationData.custom_web_customization.page_complex.price * quotationData.custom_web_customization.page_complex.quantity }}</p>
										</div>
	
										<p class="font-semibold">System Features</p>
										<div v-if="quotationData.custom_web_customization.third_party.checked" class="w-full flex items-center justify-between relative">
											<p class="w-2/4">Third Party (x{{ quotationData.custom_web_customization.third_party.quantity }})</p>
											<p class="w-1/4">RM {{ quotationData.custom_web_customization.third_party.price }}</p>
											<p class="w-1/4">RM {{ quotationData.custom_web_customization.third_party.price * quotationData.custom_web_customization.third_party.quantity }}</p>
										</div>
										<div v-if="quotationData.custom_web_customization.real_time_api.checked" class="w-full flex items-center justify-between relative">
											<p class="w-2/4">Real Time API (x{{ quotationData.custom_web_customization.real_time_api.quantity }})</p>
											<p class="w-1/4">RM {{ quotationData.custom_web_customization.real_time_api.price }}</p>
											<p class="w-1/4">RM {{ quotationData.custom_web_customization.real_time_api.price * quotationData.custom_web_customization.real_time_api.quantity }}</p>
										</div>
										<div v-if="quotationData.custom_web_customization.payment_gateway.checked" class="w-full flex items-center justify-between relative">
											<p class="w-2/4">Payment Gateway (x{{ quotationData.custom_web_customization.payment_gateway.quantity }})</p>
											<p class="w-1/4">RM {{ quotationData.custom_web_customization.payment_gateway.price }}</p>
											<p class="w-1/4">RM {{ quotationData.custom_web_customization.payment_gateway.price * quotationData.custom_web_customization.payment_gateway.quantity }}</p>
										</div>
										<div v-if="quotationData.custom_web_customization.animation.checked" class="w-full flex items-center justify-between relative">
											<p class="w-2/4">Animation and Transition (x{{ quotationData.custom_web_customization.animation.quantity }})</p>
											<p class="w-1/4">RM {{ quotationData.custom_web_customization.animation.price }}</p>
											<p class="w-1/4">RM {{ quotationData.custom_web_customization.animation.price }}</p>
										</div>
										<div v-if="quotationData.custom_web_customization.responsive.checked" class="w-full flex items-center justify-between relative">
											<p class="w-2/4">Responsive Layout (x{{ quotationData.custom_web_customization.responsive.quantity }})</p>
											<p class="w-1/4">RM {{ quotationData.custom_web_customization.responsive.price }}</p>
											<p class="w-1/4">RM {{ quotationData.custom_web_customization.responsive.price * quotationData.custom_web_customization.responsive.quantity }}</p>
										</div>
	
										<p class="font-semibold">Service</p>
										<div v-if="quotationData.custom_web_customization.revision.checked" class="w-full flex items-center justify-between relative">
											<p class="w-2/4">Revision (x{{ quotationData.custom_web_customization.revision.quantity }})</p>
											<p class="w-1/4">RM {{ quotationData.custom_web_customization.revision.price }}</p>
											<p class="w-1/4">RM {{ quotationData.custom_web_customization.revision.price * quotationData.custom_web_customization.revision.quantity }}</p>
										</div>
										<div v-if="quotationData.custom_web_customization.faster_delivery.checked" class="w-full flex items-center justify-between relative">
											<p class="w-2/4">Faster Delivery (x{{ quotationData.custom_web_customization.faster_delivery.quantity }})</p>
											<p class="w-1/4">RM {{ quotationData.custom_web_customization.faster_delivery.price }}</p>
											<p class="w-1/4">RM {{ quotationData.custom_web_customization.faster_delivery.price * quotationData.custom_web_customization.faster_delivery.quantity }}</p>
										</div>
										<div v-if="quotationData.custom_web_customization.hosting_setup.checked" class="w-full flex items-center justify-between relative">
											<p class="w-2/4">Hosting Setup (x{{ quotationData.custom_web_customization.hosting_setup.quantity }})</p>
											<p class="w-1/4">RM {{ quotationData.custom_web_customization.hosting_setup.price }}</p>
											<p class="w-1/4">RM {{ quotationData.custom_web_customization.hosting_setup.price * quotationData.custom_web_customization.hosting_setup.quantity }}</p>
										</div>
										<div v-if="quotationData.custom_web_customization.custom_design.checked" class="w-full flex items-center justify-between relative">
											<p class="w-2/4">Custom Design (x{{ quotationData.custom_web_customization.custom_design.quantity }})</p>
											<p class="w-1/4">RM {{ quotationData.custom_web_customization.custom_design.price }}</p>
											<p class="w-1/4">RM {{ quotationData.custom_web_customization.custom_design.price * quotationData.custom_web_customization.custom_design.quantity }}</p>
										</div>
										<div v-if="quotationData.custom_web_customization.maintenance.checked" class="w-full flex items-center justify-between relative">
											<p class="w-2/4">Maintenance (x{{ quotationData.custom_web_customization.maintenance.quantity }})</p>
											<p class="w-1/4">RM {{ quotationData.custom_web_customization.maintenance.price }}</p>
											<p class="w-1/4">RM {{ quotationData.custom_web_customization.maintenance.price * quotationData.custom_web_customization.maintenance.quantity }}</p>
										</div>
									</div>

									<div v-if="fullyPaidLayoutActive">
										<div class="mt-3 w-full h-[1px] bg-gray-300"></div>
										<div v-if="fullyPaidLayoutActive" class="mt-3 w-full flex items-center justify-between relative">
											<p class="w-2/4">Deposit {{ totalAmount<=500? '80%' : '50%' }}</p>
											<p class="w-1/4">RM {{ -(totalAmount * (totalAmount<=500? 0.8 : 0.5)).toFixed(2) }}</p>
											<p class="w-1/4">RM {{ -(totalAmount * (totalAmount<=500? 0.8 : 0.5)).toFixed(2) }}</p>
										</div>
									</div>
								</div>
								<div class="w-full p-3 mt-3 border-t border-gray-500">
									<div class="w-full flex items-center justify-between relative">
										<p class="w-2/4 text-lg font-bold">Total</p>
										<p class="w-1/4"></p>
										<p v-if="fullyPaidLayoutActive" class="w-1/4 text-lg font-bold">RM {{ (totalAmount - (totalAmount * (totalAmount<=500? 0.8 : 0.5))).toFixed(2) }}</p>
										<p v-if="!fullyPaidLayoutActive" class="w-1/4 text-lg font-bold">RM {{ (totalAmount).toFixed(2) }}</p>
									</div>
									<div v-if="!fullyPaidLayoutActive" class="w-full flex items-center justify-between relative">
										<p class="w-2/4 text-lg font-bold">Estimated delivery time</p>
										<p class="w-1/4"></p>
										<p class="w-1/4 text-lg font-bold">{{ totalDays }} days</p>
									</div>
								</div>
							</div>
						
							<div v-if="depositLayoutActive">
								<div class="mt-5 border rounded-xl border-gray-500">
									<div class="w-full p-3 rounded-t-xl text-gray-500 font-semibold bg-gray-100 flex items-center justify-between relative">
										<p class="w-6/12">Item</p>
										<p class="w-2/12">Quantity</p>
										<p class="w-2/12">Price</p>
										<p class="w-2/12">Amount</p>
									</div>

									<div class="p-3">
										<div class="flex items-center">
											<div class="w-6/12">Deposit {{ totalAmount<=500? '80%' : '50%' }}</div>
											<div class="w-2/12">1</div>
											<div class="w-2/12">RM {{ (totalAmount * (totalAmount<=500? 0.8 : 0.5)).toFixed(2) }}</div>
											<div class="w-2/12">RM {{ (totalAmount * (totalAmount<=500? 0.8 : 0.5)).toFixed(2) }}</div>
										</div>
									</div>

									<div class="w-full p-3 mt-3 border-t border-gray-500">
										<div class="w-full flex items-center justify-between relative">
											<p class="w-1/2 text-lg font-bold">Total</p>
											<p class="w-1/6"></p>
											<p class="w-1/6 text-lg font-bold">RM {{ (totalAmount * (totalAmount<=500? 0.8 : 0.5)).toFixed(2) }}</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="py-4 pe-[4rem] lg:h-[5rem] md:h-[5rem] sm:h-[7rem] flex lg:flex-row md:flex-row sm:flex-col items-start lg:justify-between md:justify-between sm:justify-start">
				<div class="flex items-center justify-end gap-5">
					<p class="whitespace-nowrap">Estimated duration:</p>
					<p class="text-3xl whitespace-nowrap">{{ totalDays }} Days</p>
				</div>
				<div class="flex items-center justify-end gap-5">
					<p class="whitespace-nowrap">Total:</p>
					<p class="text-3xl whitespace-nowrap">RM{{ (totalAmount).toFixed(2) }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const printLayout = ref(null);
const depositLayoutActive = ref(false);
const fullyPaidLayoutActive = ref(false);
const printLayoutActive = ref(false); 

const date = new Date();
const currentDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;

const totalAmount = ref(0);
const totalDays = ref(0);

const quotationData = ref({
	landing_page: {
		price: 349,
		checked: false,
		duration: 7,
	},
	ecommerce: {
		price: 700,
		checked: false,
		duration: 30,
	},
	custom: {
		checked: false,
	},


	// landing page
	landing_page_customization: {
		section: {
			checked: false,
			dropdown: false,
			quantity: 1,
			price: 40,
			duration: 0.5,
		},
		advanced_section: {
			checked: false,
			dropdown: false,
			quantity: 1,
			price: 80,
			duration: 0.5,
		},
		complex_section: {
			checked: false,
			dropdown: false,
			quantity: 1,
			price: 120,
			duration: 2,
		},
		third_party: {
			price: 140,
			checked: false,
			dropdown: false,
			quantity: 1,
			duration: 7,
		},
		revision: {
			price: 50,
			checked: false,
			dropdown: false,
			quantity: 1,
			duration: 1,
		},
		faster_delivery: {
			price: 50,
			checked: false,
			dropdown: false,
			quantity: 1,
		},
		hosting_setup: {
			price: 70,
			checked: false,
			dropdown: false,
			duration: 3,
			quantity: 1,
		},
		custom_design: {
			price: 100,
			checked: false,
			dropdown: false,
			quantity: 1,
			duration: 0,
		},
		maintenance: {
			price: 30,
			checked: false,
			dropdown: false,
			quantity: 1,
			duration: 3,
		},
	},


	// admin dashboard
	custom_web_customization: {
		admin_dashboard: {
			price: 180,
			checked: false,
			dropdown: false,
			duration: 3,
			quantity: 1,
		},
		counting: {
			price: 40,
			checked: false,
			dropdown: false,
			quantity: 1,
			duration: 1,
		},
		graph: {
			price: 100,
			checked: false,
			dropdown: false,
			quantity: 1,
			duration: 2,
		},
		crud_basic: {
			price: 300,
			checked: false,
			dropdown: false,
			quantity: 1,
			duration: 3,
		},
		crud_advanced: {
			price: 450,
			checked: false,
			dropdown: false,
			quantity: 1,
			duration: 3,
		},
		crud_complex: {
			price: 900,
			checked: false,
			dropdown: false,
			quantity: 1,
			duration: 6,
		},
		page_basic: {
			price: 100,
			checked: false,
			dropdown: false,
			quantity: 1,
			duration: 1,
		},
		page_advanced: {
			price: 150,
			checked: false,
			dropdown: false,
			quantity: 1,
			duration: 1,
		},
		page_complex: {
			price: 300,
			checked: false,
			dropdown: false,
			quantity: 1,
			duration: 2,
		},
		third_party: {
			price: 140,
			checked: false,
			dropdown: false,
			quantity: 1,
			duration: 7,
		},
		real_time_api: {
			price: 200,
			checked: false,
			dropdown: false,
			quantity: 1,
			duration: 4,
		},
		payment_gateway: {
			price: 200,
			checked: false,
			dropdown: false,
			quantity: 1,
			duration: 7,
		},
		animation: {
			price: 75,
			checked: false,
			dropdown: false,
			duration: 4,
			quantity: 1,
		},
		responsive: {
			price: 10,
			checked: false,
			dropdown: false,
			quantity: 1,
			duration: 1,
		},
		revision: {
			price: 50,
			checked: false,
			dropdown: false,
			quantity: 1,
			duration: 1,
		},
		faster_delivery: {
			price: 50,
			checked: false,
			dropdown: false,
			quantity: 1,
		},
		hosting_setup: {
			price: 70,
			checked: false,
			dropdown: false,
			duration: 3,
			quantity: 1,
		},
		custom_design: {
			price: 100,
			checked: false,
			dropdown: false,
			quantity: 1,
			duration: 0,
		},
		maintenance: {
			price: 30,
			checked: false,
			dropdown: false,
			quantity: 1,
			duration: 3,
		},
	},
});

const calculate = () => {
	totalDays.value = quotationData.value.custom.checked? quotationData.value.custom_web_customization.admin_dashboard.duration : 0;
  	totalAmount.value = quotationData.value.custom.checked? quotationData.value.custom_web_customization.admin_dashboard.price : 0;


	// package
	const packageItems = ['landing_page', 'ecommerce'];
	packageItems.forEach(item => {
		if (quotationData.value[item].checked) {
			const quantity = quotationData.value[item].quantity ?? 1;
			totalAmount.value += (quotationData.value[item].price * quantity);

			totalDays.value += quotationData.value[item].duration * quantity;
		}
	});

	// landing page customization
	const landingItems = ['section', 'advanced_section', 'complex_section', 'third_party', 'revision', 'faster_delivery', 'hosting_setup', 'custom_design', 'maintenance'];
	landingItems.forEach(item => {
		if (quotationData.value.landing_page_customization[item].checked) {
			const quantity = quotationData.value.landing_page_customization[item].quantity ?? 1;
			totalAmount.value += (quotationData.value.landing_page_customization[item].price * quantity);

			totalDays.value += (item=='faster_delivery'? -3 : quotationData.value.landing_page_customization[item].duration) * quantity;
		}
	});

	// custom web customization
	const customItems = [
		'admin_dashboard', 'counting', 'graph', 'crud_basic', 'crud_advanced', 'crud_complex', 'page_basic', 'page_advanced', 'page_complex', 'third_party', 'real_time_api', 'payment_gateway', 'animation', 'responsive', 'revision', 'faster_delivery', 'hosting_setup', 'custom_design', 'maintenance'
	];
	customItems.forEach(item => {
		if (quotationData.value.custom_web_customization[item].checked) {
			const quantity = quotationData.value.custom_web_customization[item].quantity ?? 1;
			totalAmount.value += (quotationData.value.custom_web_customization[item].price * quantity);

			totalDays.value += (item=='faster_delivery'? -3 : quotationData.value.custom_web_customization[item].duration) * quantity;
		}
	});
};

const print = () => {
      printLayoutActive.value = true;

      setTimeout(() => {
        const resetPrintLayout = () => {
          printLayoutActive.value = false;
	    depositLayoutActive.value = false;
	    fullyPaidLayoutActive.value = false;
          window.removeEventListener('afterprint', resetPrintLayout);
        };
        
        window.addEventListener('afterprint', resetPrintLayout);
        window.print();
      }, 100);
}

</script>