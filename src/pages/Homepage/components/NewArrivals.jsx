import React from 'react';

export default function NewArrivals() {
  return (
    <section className="py-24 bg-surface-container-lowest">
      <div className="max-w-max-width mx-auto px-margin-desktop">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-code-label text-code-label text-primary">JUST LANDED</span>
          <h2 className="font-headline-md text-headline-md text-on-surface mt-2">New Component Arrivals</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {/* Product 1 */}
          <div className="group">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-surface-container border border-outline-variant mb-4">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="High resolution product shot of a high-power MOSFET driver module. Precise soldering, clean traces, and industrial design. White background, neutral studio lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfsZ_JvwnXnTgdZDEyscfi1FzEghX_OuQzBPR6pS8r4IaC_22kHqUVdQvXhqZrf3rXEoMHM4G82KaIdIcnqPas1mqph1p5E0aFapwjUi04I2Fl9qSAD-YzPsk5JAW9-QRjCgnEwdInkTe-2vSHVUOItd-CxVaiS7I8ncpEZ4vCVUNQYf2D17W3jTYxpnaZEps5h4-Scb6gqpnF9R1vTOpsNFcumfRc_jUNvK8ix2HRfXT_kavHIuD87BuAZ6dOMSuxgaGYqLXtKgmP" />
              <div className="absolute top-4 left-4 bg-primary text-on-primary px-2 py-1 text-caption font-caption rounded">NEW</div>
            </div>
            <span className="font-code-label text-caption text-outline mb-1 block uppercase">Power Management</span>
            <h4 className="font-title-sm text-title-sm text-on-surface mb-2">High-Side MOSFET Driver</h4>
            <div className="flex items-center justify-between">
              <span className="font-title-sm text-title-sm text-primary">$12.50</span>
              <button className="p-2 border border-outline-variant rounded-full hover:bg-primary hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined">add_shopping_cart</span>
              </button>
            </div>
          </div>
          {/* Product 2 */}
          <div className="group">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-surface-container border border-outline-variant mb-4">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="A tiny camera module for microcontrollers with a visible lens and gold-plated pins. Professional electronic photography style, crisp and detailed." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDopdluKcxzpZtYRiS5NuHv_irdaDWY25DMDWNOyqxwebqN24fWNEU2sFi5-xDritx8X6fJ0QOCTm4i5uzxIM5AyX2al3CT6Q-usNCO9gF61__DzQtUGu_swrVsDOUUBsrxO21DM8ZELCM-8eL3EsxCzp5rqzAihCsisOpYa5PKg5ANuc9VvuPa98N_rc-HDbWz0wOgzWbHGnJpHwJjxQuB_85SZKpIL2s6R79p8dohfl9013-W5tDJ1rMIzC5xO9diFyN_3edDI2Dj" />
            </div>
            <span className="font-code-label text-caption text-outline mb-1 block uppercase">Vision Systems</span>
            <h4 className="font-title-sm text-title-sm text-on-surface mb-2">Micro-CMOS Cam Module</h4>
            <div className="flex items-center justify-between">
              <span className="font-title-sm text-title-sm text-primary">$24.99</span>
              <button className="p-2 border border-outline-variant rounded-full hover:bg-primary hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined">add_shopping_cart</span>
              </button>
            </div>
          </div>
          {/* Product 3 */}
          <div className="group">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-surface-container border border-outline-variant mb-4">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="A precision OLED display panel with vibrant blue text showing diagnostic data. The panel is mounted on a small breakout board. Dark tech aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpBV-vBZquwvV0QhXUL7glekKXNANdB67KMXlc-ddHJ6tcRCal2j9NmSaJKvjjGYVjpyQkddaBdNORgVB2CBg_um8px5OIcHqw4H2EGLeT_2eOd3tJyg-NaP-eWyqWn4HW3gf1C1HWznlZTzmi6fcmHMt5ChYUP5_W-cJEsceTz2PvzUeDqGRNV_ZHsk4aTzJwieSowyIp-vsq_qOmJWcCjsa7RosjjHu-jMwxLQMlV06VjGjg0-vW3zCX-498Ibtq5_z-JEYE55zd" />
            </div>
            <span className="font-code-label text-caption text-outline mb-1 block uppercase">Displays</span>
            <h4 className="font-title-sm text-title-sm text-on-surface mb-2">0.96" OLED I2C Display</h4>
            <div className="flex items-center justify-between">
              <span className="font-title-sm text-title-sm text-primary">$8.20</span>
              <button className="p-2 border border-outline-variant rounded-full hover:bg-primary hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined">add_shopping_cart</span>
              </button>
            </div>
          </div>
          {/* Product 4 */}
          <div className="group">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-surface-container border border-outline-variant mb-4">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="A high-precision barometric pressure sensor on a purple PCB with delicate gold pads. Macro electronic components photography." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAORUCVgm6Jrtcrkzu5DJYV1fdpXkAvUTcnmC-NIVpcsXhQO58ECUNEsQZPRtDmMEwMyTrGwna5GxVSBnLRxFY3ZcThdhrIC9T48JskHwrfUSQ8Yzb_kpn_47tW4S-oUd2v0EsEuyRBef9oUvFQkLGjMJ83pJ5wC4kC0CiIFYg0DRGOa_io3N1sd8h7B_lGP4VqNnRWkcyZ1AToL8MdBPb8JAzTNCQfHfejoiOAA9iKLeedd1-vETOhc4uLLOe1dE1-Tm4z75AUgm7U" />
            </div>
            <span className="font-code-label text-caption text-outline mb-1 block uppercase">Sensors</span>
            <h4 className="font-title-sm text-title-sm text-on-surface mb-2">Precision Altimeter IC</h4>
            <div className="flex items-center justify-between">
              <span className="font-title-sm text-title-sm text-primary">$15.75</span>
              <button className="p-2 border border-outline-variant rounded-full hover:bg-primary hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined">add_shopping_cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
