const options = {
	'dpf'                      : 'DPF',
	'flaps'                    : 'Flaps',
	'evap'                     : 'EVAP',
	'hotstart'                 : 'Hot Start',
	'readiness-calibration'    : 'Readiness Calibration',
	'start-stop'               : 'Start Stop',
	'vmax'                     : 'VMAX',
	'egr'                      : 'EGR',
	'active-grill-shutter'     : 'Active Grill Shutter',
	'immo-off'                 : 'IMMO Off',
	'rpm-soft-limiter-removal' : 'Remoção limitador de RPM Soft',
	'torque-monitor'           : 'Torque Monitor',
	'water-pump'               : 'Water Pump',
	'adblue'                   : 'ADBlue',
	'cat-kat'                  : 'CAT/KAT',
	'glow-plug'                : 'Glow Plug',
	'maf'                      : 'MAF',
	'sap'                      : 'SAP',
	'tprot'                    : 'Remoção Proteção de Tuning',
	'lambda'                   : 'Remoção Sensor Lambda(O2)',
	'cylinder-on-demand-off'   : 'Cylinder On Demand Off',
	'gpf-opf'                  : 'GPF/OPF',
	'nox'                      : 'NOX',
	'sport-display-calibration': 'Calibração Display SPORT',
	'tva'                      : 'TVA',
	'stage1'                   : 'Stage 1',
	'stage1+'                  : 'Stage 1+',
	'popcorn-hardcut'          : 'Popcorn com Hardcut',
	'pops-bangs'               : 'Pops e Bangs',
	'launch-control-activation': 'Ativação de Launch Control',
	'fca-unlock'               : 'Desbloqueio FCA',
	'golf-farts'               : 'Farts (Golf)',
	'outros'                   : 'Outros'
}

export const getOptionDescription = optionKey => options[optionKey];

export function renderOptions() {
	const optionsContainer = document.querySelector('#fileservice div > form > div:nth-child(3)');

	Object.entries(options).forEach(([optionSlug, optionText]) => {
		const label             = document.createElement('label');
		      label.htmlFor     = optionSlug;
		      label.textContent = optionText;

		const checkbox      = document.createElement('input');
		      checkbox.type = 'checkbox';
		      checkbox.id   = optionSlug;
		      checkbox.name = optionSlug;

		const checkboxContainer = document.createElement('div');
		checkboxContainer.appendChild(checkbox);
		checkboxContainer.appendChild(label);

		optionsContainer.appendChild(checkboxContainer);
	});
}