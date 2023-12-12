const options = {
	'dpf'                      : 'DPF',
	'flaps'                    : 'FLAPS',
	'evap'                     : 'EVAP',
	'hotstart'                 : 'HOTSTART',
	'readiness-calibration'    : 'READINESS CALIBRATION',
	'start-stop'               : 'START-STOP',
	'vmax'                     : 'VMAX',
	'egr'                      : 'EGR',
	'active-grill-shutter'     : 'Active grill shutter',
	'immo-off'                 : 'IMMO OFF',
	'rpm-soft-limiter-removal' : 'RPM Soft Limiter Removal',
	'torque-monitor'           : 'Torque MOnitor',
	'water-pump'               : 'Water Pump',
	'adblue'                   : 'Adblue',
	'cat-kat'                  : 'CAT/KAT',
	'glow-plug'                : 'GLOW PLUG',
	'maf'                      : 'MAF',
	'sap'                      : 'SAP',
	'tprot'                    : 'TPROT',
	'lambda'                   : 'LAMBDA',
	'cylinder-on-demand-off'   : 'CYLINDER ON DEMAND OFF',
	'gpf-opf'                  : 'GPF/OPF',
	'nox'                      : 'NOX',
	'sport-display-calibration': 'SPORT Display Calibration',
	'tva'                      : 'TVA',
	'stage1'                   : 'Stage1',
	'stage1+'                  : 'Stage1+',
	'popcorn-hardcut'          : 'PopCorn - Hardcaut',
	'pops-bangs'               : 'Popsbangs',
	'launch-control-activation': 'Launch Control Activation',
	'fca-unlock'               : 'FCA Unlock',
	'golf-farts'               : 'Farts (Golf)'
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