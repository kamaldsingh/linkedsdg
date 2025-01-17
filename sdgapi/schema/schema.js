schemaString = `"""
A code from an SDG coding scheme.
"""
type Code {
  """
  The type of the object.
  """
  _type: String
  
  """The URI identfier of the object."""
  _id: ID! 

  """The label of the object.""" 
  prefLabel: String

  """The conventional notation for this object.""" 
  notation: String

  """The corrsponding SDMX notation for this object.""" 
  sdmxDSDcode: String
}

"""
An SDG coding scheme.
"""
type CodeScheme {
  """
  The type of the object.
  """
  _type: String
  
  """The URI identfier of the object.""" 
  _id: ID!
  
  """The label of the object.""" 
  prefLabel: String
  
  """The codes in this code scheme.""" 
  codes: [Code]
 
}


"""
A collection of observations, organized into temporal slices, conforming to some common dimensional structure.
"""
type DataSet{ 
  """
  The type of the object.
  """
  _type: String

  """The URI identfier of the object."""
  _id: ID!

  """The unit in which the data values are measured."""
  unitMeasure: Code

  """Indicates the structure to which this data set conforms."""
  structure: DataStructureDefinition

  """The label of the object."""   
  label: String

  """The conventional notation for this object."""
  notation: String

  """
  Indicates a subset of a dataset defined by fixing a subset of the dimensional values (here all except for year).
  """
  slice( 

    """The filter on the dimension: geoArea."""
    geoArea: [geoAreaCodes]

    """The filter on the dimension: disabilityStatus."""
    disabilityStatus: [disabilityStatusCodes]

    """The filter on the dimension: bound."""
    bound: [boundCodes]

    """The filter on the dimension: modeOfTransportation."""
    modeOfTransportation: [modeOfTransportationCodes]

    """The filter on the dimension: hazardType."""
    hazardType: [hazardTypeCodes]

    """The filter on the dimension: typeOfOccupation."""
    typeOfOccupation: [typeOfOccupationCodes]

    """The filter on the dimension: nameOfInternationalInstitution."""
    nameOfInternationalInstitution: [nameOfInternationalInstitutionCodes]

    """The filter on the dimension: educationLevel."""
    educationLevel: [educationLevelCodes]

    """The filter on the dimension: location."""
    location: [locationCodes]

    """The filter on the dimension: ihrCapacity."""
    ihrCapacity: [ihrCapacityCodes]

    """The filter on the dimension: typeOfSkill."""
    typeOfSkill: [typeOfSkillCodes]

    """The filter on the dimension: cities."""
    cities: [citiesCodes]

    """The filter on the dimension: nameOfNonCommunicableDisease."""
    nameOfNonCommunicableDisease: [nameOfNonCommunicableDiseaseCodes]

    """The filter on the dimension: freq."""
    freq: [freqCodes]

    """The filter on the dimension: sex."""
    sex: [sexCodes]

    """The filter on the dimension: typeOfMobileTechnology."""
    typeOfMobileTechnology: [typeOfMobileTechnologyCodes]

    """The filter on the dimension: levelStatus."""
    levelStatus: [levelStatusCodes]

    """The filter on the dimension: age."""
    age: [ageCodes]

    """The filter on the dimension: typeOfProduct."""
    typeOfProduct: [typeOfProductCodes]

    """The filter on the dimension: migratoryStatus."""
    migratoryStatus: [migratoryStatusCodes]

    """The filter on the dimension: typeOfSpeed."""
    typeOfSpeed: [typeOfSpeedCodes]

  ): [Slice]

}

"""
Defines the structure of a dataset. 
"""
type DataStructureDefinition {
  """
  The type of the object.
  """
  _type: String
  
  """The URI identfier of the object."""
  _id: ID!

  """The dimensions of this data cube."""
  dimension: [DimensionProperty]

  """The measure property of this data cube."""
  measure: MeasureProperty
}


"""
The properties which represent the dimensions of the cube.
"""
type DimensionProperty {
  """
  The type of the object.
  """
  _type: String
  
  """The URI identfier of the object."""
  _id: String

  """The label of the object.""" 
  label: String

  """The conventional notation for this object."""
  notation: String
  
  """The code scheme for this dimension. """
  codeList: CodeScheme

  """The corrsponding SDMX notation for this object.""" 
  sdmxDSDcode: String
}


"""
The properties which represent the measured value of the phenomenon being observed.
"""
type MeasureProperty {
  """
  The type of the object.
  """
  _type: String
  
  """The URI identfier of the object."""
  _id: String

  """The conventional notation for this object."""
  notation: String

  """The label of the object.""" 
  label: String

}


"""
A single observation in the cube, may have one or more associated measured values
"""
type Observation {
  """
  The type of the object.
  """
  _type: String

  """The URI identfier of the object."""
  _id: ID!

  """The unit in which the data values are measured."""
  unitMeasure: Code

  """Indicates the value of the dimension: year."""
  year: Int

  """The value of the observed measure."""
  observedValue: String
 
}


type DataSetInfo {
  """
  The type of the object.
  """
  _type: String

  """The URI identfier of the object."""
  _id: ID!

  """The label of the object.""" 
  label: String

  """The conventional notation for this object."""
  notation: String

  """The unit in which the data values are measured."""
  unitMeasure: Code

  """Indicates the structure to which this data set conforms"""
  structure: DataStructureDefinition
}


"""Get objects of specific types."""
type Query {

  """List available datasets (SDG data series) with their core metadata."""
  DataSetInfo: [DataSetInfo]
  
  """Query data from a specified dataset (SDG data series)."""
  DataSet( 
    """
    The code of a selected dataset.
    """
    series: SeriesCodes! 
  ): DataSet
 
  """List objects of type: DimensionProperty."""
  DimensionProperty: [DimensionProperty]

  """List objects of type: MeasureProperty."""
  MeasureProperty: [MeasureProperty]
 
  
  """List objects of type: CodeScheme."""
  CodeScheme(
    """
    Filter of the code schemes.
    """
    codeSchemes: codeSchemes
    
  ): [CodeScheme]
 

  """
  The mapping from types and fields of the GraphQL schema to the corresponding URIs of the employed linked data vocabularies.
  """
  JSON_LD_CONTEXT: String
}

"""
A subset of a dataset defined by fixing a subset of the dimensional values (all except for the year). Note that the dimensions of the slice are always the same as its dataset, minus the dimension year.
"""
type Slice  {
  """
  The type of the object.
  """
  _type: String

  """The URI identfier of the object."""
  _id: ID!
  
  """Indicates a observation contained within this slice of the data set."""
  observation(
    """The filter on the dimension: year. The available data ranges over years 1990-2019."""
    year: [Int]
  ): [Observation]
 
    """Indicates the value of the dimension: geoArea."""
    geoArea: Code

    """Indicates the value of the dimension: disabilityStatus."""
    disabilityStatus: Code

    """Indicates the value of the dimension: bound."""
    bound: Code

    """Indicates the value of the dimension: modeOfTransportation."""
    modeOfTransportation: Code

    """Indicates the value of the dimension: hazardType."""
    hazardType: Code

    """Indicates the value of the dimension: typeOfOccupation."""
    typeOfOccupation: Code
 
    """Indicates the value of the dimension: nameOfInternationalInstitution."""
    nameOfInternationalInstitution: Code

    """Indicates the value of the dimension: educationLevel."""
    educationLevel: Code

    """Indicates the value of the dimension: location."""
    location: Code

    """Indicates the value of the dimension: ihrCapacity."""
    ihrCapacity: Code

    """Indicates the value of the dimension: typeOfSkill."""
    typeOfSkill: Code

    """Indicates the value of the dimension: cities."""
    cities: Code

    """Indicates the value of the dimension: nameOfNonCommunicableDisease."""
    nameOfNonCommunicableDisease: Code

    """Indicates the value of the dimension: freq."""
    freq: Code

    """Indicates the value of the dimension: sex."""
    sex: Code

    """Indicates the value of the dimension: typeOfMobileTechnology."""
    typeOfMobileTechnology: Code

    """Indicates the value of the dimension: levelStatus."""
    levelStatus: Code

    """Indicates the value of the dimension: age."""
    age: Code

    """Indicates the value of the dimension: typeOfProduct."""
    typeOfProduct: Code

    """Indicates the value of the dimension: migratoryStatus."""
    migratoryStatus: Code

    """Indicates the value of the dimension: typeOfSpeed."""
    typeOfSpeed: Code

 
}
 
"""The SDG coding schemes."""
enum codeSchemes{
  """Units of measurement coding scheme."""
  unitsCodes
  """Coding scheme for the dimension: age."""
  ageCodes
  """Coding scheme for the dimension: sex."""
  sexCodes
  """Coding scheme for the dimension: location."""
  locationCodes
  """Coding scheme for the dimension: nameOfInternationalInstitution."""
  nameOfInternationalInstitutionCodes
  """Coding scheme for the dimension: cities."""
  citiesCodes
  """Coding scheme for the dimension: typeOfProduct."""
  typeOfProductCodes
  """Coding scheme for the dimension: bound."""
  boundCodes
  """Coding scheme for the dimension: freq."""
  freqCodes
  """Coding scheme for the dimension: typeOfSpeed."""
  typeOfSpeedCodes
  """Coding scheme for the dimension: nameOfNonCommunicableDisease."""
  nameOfNonCommunicableDiseaseCodes
  """Coding scheme for the dimension: typeOfOccupation."""
  typeOfOccupationCodes
  """Coding scheme for the dimension: ihrCapacity."""
  ihrCapacityCodes
  """Coding scheme for the dimension: educationLevel."""
  educationLevelCodes
  """Coding scheme for the dimension: typeOfSkill."""
  typeOfSkillCodes
  """Coding scheme for the dimension: levelStatus."""
  levelStatusCodes
  """Coding scheme for the dimension: disabilityStatus."""
  disabilityStatusCodes
  """Coding scheme for the dimension: migratoryStatus."""
  migratoryStatusCodes
  """Coding scheme for the dimension: modeOfTransportation."""
  modeOfTransportationCodes
  """Coding scheme for the dimension: typeOfMobileTechnology."""
  typeOfMobileTechnologyCodes
  """Coding scheme for the dimension: geoArea (UN M49 standard)."""
  geoAreaCodes
  """Coding scheme for the dimension: hazardType."""
  hazardTypeCodes
}

"""The codes of the available datasets (SDG data series)."""
enum SeriesCodes { 
"""Indicator of Food Price Anomalies (IFPA), by type of product"""
AG_FPA_COMM
"""Forest area as a proportion of total land area (%)"""
AG_LND_FRST
"""Above-ground biomass in forest per hectare (tonnes per hectare)"""
AG_LND_FRSTBIOPHA
"""Forest area certified under an independently verified certification scheme (thousands of hectares)"""
AG_LND_FRSTCERT
"""Forest area net change rate (%)"""
AG_LND_FRSTCHG
"""Proportion of forest area with a long-term management plan (%)"""
AG_LND_FRSTMGT
"""Forest area (thousands of hectares)"""
AG_LND_FRSTN
"""Proportion of forest area within legally established protected areas (%)"""
AG_LND_FRSTPRCT
"""Land area (thousands of hectares)"""
AG_LND_TOTL
"""Prevalence of severe food insecurity in the adult population (%)"""
AG_PRD_FIESSI
"""Total population in severe food insecurity (thousands of people)"""
AG_PRD_FIESSIN
"""Agriculture orientation index for government expenditures"""
AG_PRD_ORTIND
"""Agricultural export subsidies (millions of current United States dollars)"""
AG_PRD_XSUBDY
"""Volume of remittances (in United States dollars) as a proportion of total GDP (%)"""
BX_TRF_PWKR
"""Total official development assistance (gross disbursement) for technical cooperation (millions of 2017 United States dollars)"""
DC_FTA_TOTAL
"""Total official development assistance for biodiversity, by donor countries (millions of constant 2017 United States dollars)"""
DC_ODA_BDVDL
"""Total official development assistance for biodiversity, by recipient countries (millions of constant 2017 United States dollars)"""
DC_ODA_BDVL
"""Net official development assistance (ODA) to LDCs as a percentage of OECD-DAC donors' GNI, by donor countries (%)"""
DC_ODA_LDCG
"""Net official development assistance (ODA) to LDCs from OECD-DAC countries, by donor countries (millions of constant 2017 United States dollars)"""
DC_ODA_LDCS
"""Net official development assistance (ODA) to landlocked developing countries from OECD-DAC countries, by donor countries (millions of constant 2017 United States dollars)"""
DC_ODA_LLDC
"""Net official development assistance (ODA) to landlocked developing countries as a percentage of OECD-DAC donors' GNI, by donor countries (%)"""
DC_ODA_LLDCG
"""Net official development assistance (ODA) to small island states (SIDS) from OECD-DAC countries, by donor countries (millions of constant 2017 United States dollars)"""
DC_ODA_SIDS
"""Net official development assistance (ODA) to small island states (SIDS) as a percentage of OECD-DAC donors' GNI, by donor countries (%)"""
DC_ODA_SIDSG
"""Net official development assistance (ODA) as a percentage of OECD-DAC donors' GNI, by donor countries (%)"""
DC_ODA_TOTG
"""Net official development assistance (ODA) from OECD-DAC countries, by donor countries (millions of constant 2017 United States dollars)"""
DC_ODA_TOTL
"""Total official flows (disbursements) for agriculture, by recipient countries (millions of constant 2017 United States dollars)"""
DC_TOF_AGRL
"""Total official development assistance to medical research and basic heath sectors, gross disbursement, by recipient countries (millions of constant 2017 United States dollars)"""
DC_TOF_HLTHL
"""Total official development assistance to medical research and basic heath sectors, net disbursement, by recipient countries (millions of constant 2017 United States dollars)"""
DC_TOF_HLTHNT
"""Total official flows for infrastructure, by recipient countries (millions of constant 2017 United States dollars)"""
DC_TOF_INFRAL
"""Total official flows for scholarships, by recipient countries (millions of constant 2017 United States dollars)"""
DC_TOF_SCHIPSL
"""Total official flows (commitments) for Aid for Trade, by donor countries (millions of constant 2017 United States dollars)"""
DC_TOF_TRDCMDL
"""Total official flows (commitments) for Aid for Trade, by recipient countries (millions of constant 2017 United States dollars)"""
DC_TOF_TRDCML
"""Total official flows (disbursement) for Aid for Trade, by donor countries (millions of constant 2017 United States dollars)"""
DC_TOF_TRDDBMDL
"""Total official flows (disbursement) for Aid for Trade, by recipient countries (millions of constant 2017 United States dollars)"""
DC_TOF_TRDDBML
"""Total official development assistance (gross disbursement) for water supply and sanitation, by recipient countries (millions of constant 2017 United States dollars)"""
DC_TOF_WASHL
"""Total assistance for development, by donor countries (millions of current United States dollars)"""
DC_TRF_TOTDL
"""Total assistance for development, by recipient countries (millions of current United States dollars)"""
DC_TRF_TOTL
"""Debt service as a proportion of exports of goods and services (%)"""
DT_TDS_DECT
"""Proportion of population with primary reliance on clean fuels and technology (%)"""
EG_EGY_CLEAN
"""Energy intensity level of primary energy (megajoules per constant 2011 purchasing power parity GDP)"""
EG_EGY_PRIM
"""Proportion of population with access to electricity, by urban/rural (%)"""
EG_ELC_ACCS
"""Renewable energy share in the total final energy consumption (%)"""
EG_FEC_RNEW
"""Carbon dioxide emissions from fuel combustion (millions of tonnes)"""
EN_ATM_CO2
"""Carbon dioxide emissions per unit of GDP (kilogrammes of CO2 per constant 2010 United States dollars)"""
EN_ATM_CO2GDP
"""Carbon dioxide emissions per unit of manufacturing value added (kilogrammes of CO2 per constant 2010 United States dollars)"""
EN_ATM_CO2MVA
"""Annual mean levels of fine particulate matter in cities, urban population (micrograms per cubic meter)"""
EN_ATM_PM25
"""Proportion of urban population living in slums (%)"""
EN_LND_SLUM
"""Domestic material consumption per capita, by type of raw material (tonnes)"""
EN_MAT_DOMCMPC
"""Domestic material consumption per unit of GDP, by type of raw material (kilograms per constant 2010 United States dollars)"""
EN_MAT_DOMCMPG
"""Domestic material consumption, by type of raw material (tonnes)"""
EN_MAT_DOMCMPT
"""Material footprint per capita, by type of raw material (tonnes)"""
EN_MAT_FTPRPC
"""Material footprint per unit of GDP, by type of raw material (kilograms per constant 2010 United States dollar)"""
EN_MAT_FTPRPG
"""Material footprint, by type of raw material (tonnes)"""
EN_MAT_FTPRTN
"""Municipal Solid Waste collection coverage, by cities (%)"""
EN_REF_WASCOL
"""Countries that have legislative, administrative and policy framework or measures reported to the Access and Benefit-Sharing Clearing-House (1 = YES; 0 = NO)"""
ER_CBD_ABSCLRHS
"""Countries that are parties to the Nagoya Protocol (1 = YES; 0 = NO)"""
ER_CBD_NAGOYA
"""Countries that have legislative, administrative and policy framework or measures reported through the Online Reporting System on Compliance  of the International Treaty on Plant Genetic Resources for Food and Agriculture (PGRFA) (1 = YES; 0 = NO)"""
ER_CBD_ORSPGRFA
"""Countries that are contracting Parties to the International Treaty on Plant Genetic Resources for Food and Agriculture (PGRFA) (1 = YES; 0 = NO)"""
ER_CBD_PTYPGRFA
"""Total reported number of Standard Material Transfer Agreements (SMTAs) transferring plant genetic resources for food and agriculture to the country (number)"""
ER_CBD_SMTA
"""Proportion of local breeds for which sufficient genetic resources are stored for reconstitution (%)"""
ER_GRF_ANIMRCNT
"""Plant breeds for which sufficient genetic resources are stored (number)"""
ER_GRF_PLNTSTOR
"""Proportion of fish stocks within biologically sustainable levels (not overexploited) (%)"""
ER_H2O_FWTL
"""Proportion of countries with high level of users/communities participating in planning programs in rural drinking-water supply (%)"""
ER_H2O_PARTIC
"""Proportion of countries with clearly defined procedures in law or policy for participation by service users/communities in planning program in rural drinking-water supply (%)"""
ER_H2O_PROCED
"""Level of water stress: freshwater withdrawal as a proportion of available freshwater resources (%)"""
ER_H2O_STRESS
"""Coverage of protected areas in relation to marine areas (Exclusive Economic Zones) (%)"""
ER_MRN_MARIN
"""Protected marine area (Exclusive Economic Zones) (square kilometres)"""
ER_MRN_MARINT
"""Mountain green cover area (square kilometres)"""
ER_MTN_GRNCOV
"""Mountain Green Cover Index"""
ER_MTN_GRNCVI
"""Mountain area (square kilometres)"""
ER_MTN_TOTL
"""Average proportion of Freshwater Key Biodiversity Areas (KBAs) covered by protected areas (%)"""
ER_PTD_FRWRT
"""Average proportion of Mountain Key Biodiversity Areas (KBAs) covered by protected areas (%)"""
ER_PTD_MOTN
"""Average proportion of Terrestrial Key Biodiversity Areas (KBAs) covered by protected areas (%)"""
ER_PTD_TERRS
"""Red List Index"""
ER_RSK_LSTI
"""Proportion of countries with high level of users/communities participating in planning programs in water resources planning and management (%)"""
ER_WAT_PARTIC
"""Proportion of countries with clearly defined procedures in law or policy for participation by service users/communities in planning program in water resources planning and management (%)"""
ER_WAT_PROCED
"""Number of automated teller machines (ATMs) per 100,000 adults"""
FB_ATM_TOTL
"""Proportion of adults (15 years and older) with an account at a financial institution or mobile-money-service provider, by sex (% of adults aged 15 years and older)"""
FB_BNK_ACCSS
"""Number of commercial bank branches per 100,000 adults"""
FB_CBK_BRCH
"""Researchers (in full-time equivalent) per million inhabitants (per 1,000,000 population)"""
GB_POP_SCIERD
"""Research and development expenditure as a proportion of GDP (%)"""
GB_XPD_RSDV
"""Bribery incidence (% of firms experiencing at least one bribe payment request)"""
IC_FRM_BRIB
"""Proportion of women in managerial positions (%)"""
IC_GEN_MGTL
"""Proportion of women in senior and middle management positions (%)"""
IC_GEN_MGTN
"""Freight volume, by mode of transport (tonne kilometres)"""
IS_RDP_FRGVOL
"""Passenger volume (passenger kilometres), by mode of transport"""
IS_RDP_PFVOL
"""Proportion of population covered by a mobile network, by technology (%)"""
IT_MOB_NTWK
"""Proportion of individuals who own a mobile telephone, by sex (%)"""
IT_MOB_OWN
"""Number of fixed Internet broadband subscriptions, by speed (number)"""
IT_NET_BBN
"""Fixed Internet broadband subscriptions per 100 inhabitants, by speed (per 100 inhabitants)"""
IT_NET_BBP
"""Internet users per 100 inhabitants"""
IT_USE_ii99
"""Manufacturing value added as a proportion of GDP (%)"""
NV_IND_MANF
"""Manufacturing value added per capita (constant 2010 United States dollars)"""
NV_IND_MANFPC
"""Proportion of medium and high-tech industry value added in total value added (%)"""
NV_IND_TECH
"""Annual growth rate of real GDP per capita (%)"""
NY_GDP_PCAP
"""Schools with access to computers for pedagogical purposes, by education level (%)"""
SE_ACC_COMP
"""Schools with access to basic drinking water, by education level (%)"""
SE_ACC_DWAT
"""Schools with access to electricity, by education level (%)"""
SE_ACC_ELEC
"""Schools with basic handwashing facilities, by education level (%)"""
SE_ACC_HNWA
"""Schools with access to the internet for pedagogical purposes, by education level (%)"""
SE_ACC_INTN
"""Schools with access to access to single-sex basic sanitation, by education level (%)"""
SE_ACC_SANI
"""Proportion of youth and adults with information and communications technology (ICT) skills, by sex and type of skill (%)"""
SE_ADT_ACTS
"""Participation rate in formal and non-formal education and training, by sex (%)"""
SE_ADT_EDUCTRN
"""Proportion of children aged 36−59 months who are developmentally on track in at least three of the following domains: literacy-numeracy, physical development, social-emotional development, and learning (% of children aged 36-59 months)"""
SE_DEV_ONTRK
"""Gender parity index achieving at least a fixed level of proficiency in functional literacy skills (ratio)"""
SE_GPI_FUNPROF
"""Gender parity index for achievement in mathematics, by education level (ratio)"""
SE_GPI_MATACH
"""Gender parity index for achievement in reading, by education level (ratio)"""
SE_GPI_REAACH
"""Gender parity index of trained teachers, by education level (ratio)"""
SE_GPI_TRATEA
"""Minimum proficiency in mathematics, by education level and sex (%)"""
SE_MAT_PROF
"""Participation rate in organized learning (one year before the official primary entry age), by sex (%)"""
SE_PRE_PARTN
"""Minimum proficiency in reading, by education level and sex (%)"""
SE_REA_PROF
"""Low to high socio-economic parity status index achieving at least a fixed level of proficiency in functional numeracy skills  (ratio)"""
SE_SEP_FUNPROF
"""Low to high socio-economic parity status index for achievement in mathematics, by education level (ratio)"""
SE_SEP_MATACH
"""Low to high socio-economic parity status index for achievement in reading, by education level (ratio)"""
SE_SEP_REAACH
"""Proportion of teachers who have received at least the minimum organized teacher training (e.g. pedagogical training) pre-service or in-service required for teaching at the relevant level in a given country, by sex and education level (%)"""
SE_TRA_GRDL
"""Rural to urban parity index for achievement in mathematics, by education level (ratio)"""
SE_URP_MATACH
"""Rural to urban parity index for achievement in reading, by education level (ratio)"""
SE_URP_REAACH
"""Proportion of seats held by women in national parliaments (% of total number of seats)"""
SG_GEN_PARL
"""Number of seats held by women in national parliaments (number)"""
SG_GEN_PARLN
"""Number of seats in national parliaments (number)"""
SG_GEN_PARLNT
"""Countries that adopt and implement constitutional, statutory and/or policy guarantees for public access to information"""
SG_INF_ACCSS
"""Proportion of members of developing countries in international organizations, by organization (%)"""
SG_INT_MBRDEV
"""Proportion of voting rights of developing countries in international organizations, by organization (%)"""
SG_INT_VRTDEV
"""Proportion of countries with independent National Human Rights Institutions in compliance with the Paris Principles (%)"""
SG_NHR_IMPL
"""Countries with National Human Rights Institutions in compliance with the Paris Principles, A status (1 = YES; 0 = NO)"""
SG_NHR_IMPLN
"""Proportion of countries that applied for accreditation as independent National Human Rights Institutions in compliance with the Paris Principles (%)"""
SG_NHR_INTEXST
"""Countries with National Human Rights Institutions not fully compliant with the Paris Principles, B status (1 = YES; 0 = NO)"""
SG_NHR_INTEXSTN
"""Countries with no application for accreditation with the Paris Principles, D status  (1 = YES; 0 = NO)"""
SG_NHR_NOAPPLN
"""Countries with National Human Rights Institutions and no status with the Paris Principles, C status (1 = YES; 0 = NO)"""
SG_NHR_NOSTUSN
"""Progress in multi-stakeholder development effectiveness monitoring frameworks that support the achievement of the sustainable development goals (1 = YES; 0 = NO)"""
SG_PLN_MSTKSDG
"""Proportion of new development interventions drawn from country-led result frameworks - data by provider (%)"""
SG_PLN_PRVNDI
"""Proportion of results indicators drawn from country-led results frameworks - data by provider (%)"""
SG_PLN_PRVRICTRY
"""Proportion of results indicators which will be monitored using government sources and monitoring systems - data by provider (%)"""
SG_PLN_PRVRIMON
"""Proportion of new development interventions drawn from country-led result frameworks - data by recipient (%)"""
SG_PLN_RECNDI
"""Proportion of results indicators drawn from country-led results frameworks - data by recipient (%)"""
SG_PLN_RECRICTRY
"""Proportion of results indicators which will be monitored using government sources and monitoring systems - data by recipient (%)"""
SG_PLN_RECRIMON
"""Proportion of countries with birth registration data that are at least 90 percent complete (%)"""
SG_REG_BRTH90
"""Countries with birth registration data that are at least 90 percent complete (1 = YES; 0 = NO)"""
SG_REG_BRTH90N
"""Proportion of children under 5 years of age whose births have been registered with a civil authority (% of children under 5 years of age)"""
SG_REG_BRTH
"""Proportion of countries that have conducted at least one population and housing census in the last 10 years (%)"""
SG_REG_CENSUS
"""Countries that have conducted at least one population and housing census in the last 10 years (1 = YES; 0 = NO)"""
SG_REG_CENSUSN
"""Proportion of countries with death registration data that are at least 75 percent complete (%)"""
SG_REG_DETH75
"""Countries with death registration data that are at least 75 percent complete (1 = YES; 0 = NO)"""
SG_REG_DETH75N
"""Dollar value of all resources made available to strengthen statistical capacity in developing countries (current United States dollars)"""
SG_STT_CAPTY
"""Countries with national statistical legislation exists that complies with the Fundamental Principles of Official Statistics (1 = YES; 0 = NO)"""
SG_STT_FPOS
"""Countries with national statistical plans with funding from donors (1 = YES; 0 = NO)"""
SG_STT_NSDSFDDNR
"""Countries with national statistical plans with funding from Government (1 = YES; 0 = NO)"""
SG_STT_NSDSFDGVT
"""Countries with national statistical plans with funding from others (1 = YES; 0 = NO)"""
SG_STT_NSDSFDOTHR
"""Countries with national statistical plans that are fully funded (1 = YES; 0 = NO)"""
SG_STT_NSDSFND
"""Countries with national statistical plans that are under implementation (1 = YES; 0 = NO)"""
SG_STT_NSDSIMPL
"""Age-standardized mortality rate attributed to ambient air pollution (deaths per 100,000 population)"""
SH_AAP_ASMORT
"""Crude death rate attributed to ambient air pollution (deaths per 100,000 population)"""
SH_AAP_MORT
"""Alcohol consumption per capita (aged 15 years and older) within a calendar year (litres of pure alcohol)"""
SH_ALC_CONSPT
"""Number of deaths attributed to non-communicable diseases, by type of disease and sex (number)"""
SH_DTH_RNCOM
"""Infant mortality rate (deaths per 1,000 live births)"""
SH_DYN_IMRT
"""Infant deaths (number)"""
SH_DYN_IMRTN
"""Under-five mortality rate, by sex (deaths per 1,000 live births)"""
SH_DYN_MORT
"""Under-five deaths (number)"""
SH_DYN_MORTN
"""Neonatal mortality rate (deaths per 1,000 live births)"""
SH_DYN_NMRT
"""Neonatal deaths (number)"""
SH_DYN_NMRTN
"""Proportion of women who make their own informed decisions regarding sexual relations, contraceptive use and reproductive health care (% of women aged 15-49 years)"""
SH_FPL_INFM
"""Proportion of women of reproductive age (aged 15-49 years) who have their need for family planning satisfied with modern methods (% of women aged 15-49 years)"""
SH_FPL_MTMM
"""Proportion of population using safely managed drinking water services, by urban/rural (%)"""
SH_H2O_SAFE
"""Age-standardized mortality rate attributed to household air pollution (deaths per 100,000 population)"""
SH_HAP_ASMORT
"""Crude death rate attributed to household air pollution (deaths per 100,000 population)"""
SH_HAP_MORT
"""Number of new HIV infections per 1,000 uninfected population, by sex and age (per 1,000 uninfected population)"""
SH_HIV_INCD
"""Health worker density, by type of occupation (per 10,000 population)"""
SH_MED_HEAWOR
"""Age-standardized prevalence of current tobacco use among persons aged 15 years and older, by sex (%)"""
SH_PRV_SMOK
"""Proportion of population practicing open defecation, by urban/rural (%)"""
SH_SAN_DEFECT
"""Proportion of population with basic handwashing facilities on premises, by urban/rural (%)"""
SH_SAN_HNDWSH
"""Proportion of population using safely managed sanitation services, by urban/rural (%)"""
SH_SAN_SAFE
"""Crude death rate attributed to household and ambient air pollution (deaths per 100,000 population)"""
SH_STA_AIRP
"""Age-standardized mortality rate attributed to household and ambient air pollution (deaths per 100,000 population)"""
SH_STA_ASAIRP
"""Proportion of births attended by skilled health personnel (%)"""
SH_STA_BRTC
"""Proportion of girls and women aged 15-49 years who have undergone female genital mutilation/cutting, by age (%)"""
SH_STA_FGMS
"""Malaria incidence per 1,000 population at risk (per 1,000 population)"""
SH_STA_MALR
"""Maternal mortality ratio"""
SH_STA_MMR
"""Proportion of children moderately or severely overweight (%)"""
SH_STA_OVRWGT
"""Children moderately or severely overweight (millions)"""
SH_STA_OVRWGTN
"""Mortality rate attributed to unintentional poisonings, by sex (deaths per 100,000 population)"""
SH_STA_POISN
"""Suicide mortality rate, by sex (deaths per 100,000 population)"""
SH_STA_SCIDE
"""Number of deaths attributed to suicide, by sex (number)"""
SH_STA_SCIDEN
"""Proportion of children moderately or severely stunted (%)"""
SH_STA_STUNT
"""Children moderately or severely stunted (millions)"""
SH_STA_STUNTN
"""Death rate due to road traffic injuries (per 100,000 population)"""
SH_STA_TRAF
"""Mortality rate attributed to unsafe water, unsafe sanitation and lack of hygiene (deaths per 100,000 population)"""
SH_STA_WASH
"""Proportion of children moderately or severely wasted (%)"""
SH_STA_WASTE
"""Children moderately or severely wasted (millions)"""
SH_STA_WASTEN
"""Tuberculosis incidence (per 100,000 population)"""
SH_TBS_INCID
"""Number of people requiring interventions against neglected tropical diseases (number)"""
SH_TRP_INTVN
"""[ILO] Proportion of population covered by at least one social protection benefit, by sex (%)"""
SI_COV_BENFTS
"""[ILO] Proportion of children/households receiving child/family cash benefit, by sex (%)"""
SI_COV_CHLD
"""[ILO] Proportion of population with severe disabilities receiving disability cash benefit, by sex (%)"""
SI_COV_DISAB
"""[World Bank] Proportion of population covered by labour market programs (%)"""
SI_COV_LMKT
"""[World Bank] Poorest quintile covered by labour market programs (%) """
SI_COV_LMKTPQ
"""[ILO] Proportion of mothers with newborns receiving maternity cash benefit (%)"""
SI_COV_MATNL
"""[ILO] Proportion of population above statutory pensionable age receiving a pension, by sex (%)"""
SI_COV_PENSN
"""[ILO] Proportion of poor population receiving social assistance cash benefit, by sex (%)"""
SI_COV_POOR
"""[World Bank] Proportion of population covered by social assistance programs (%)"""
SI_COV_SOCAST
"""[World Bank] Poorest quintile covered by social assistance programs (%)"""
SI_COV_SOCASTPQ
"""[World Bank] Proportion of population covered by social insurance programs (%)"""
SI_COV_SOCINS
"""[World Bank] Poorest quintile covered by social insurance programs (%)"""
SI_COV_SOCINSPQ
"""[ILO] Proportion of unemployed persons receiving unemployment cash benefit, by sex (%)"""
SI_COV_UEMP
"""[ILO] Proportion of vulnerable population receiving social assistance cash benefit, by sex (%)"""
SI_COV_VULN
"""[ILO] Proportion of employed population covered in the event of work injury, by sex (%)"""
SI_COV_WKINJRY
"""Growth rates of household expenditure or income per capita among the bottom 40 per cent of the population (%)"""
SI_HEI_BTN40
"""Growth rates of household expenditure or income per capita (%)"""
SI_HEI_TOTL
"""Proportion of population below international poverty line (%)"""
SI_POV_DAY1
"""Employed population below international poverty line, by sex and age (%)"""
SI_POV_EMP1
"""Proportion of population living below the national poverty line (%)"""
SI_POV_NAHC
"""Remittance costs as a proportion of the amount remitted (%)"""
SI_RMT_COST
"""Proportion of time spent on unpaid domestic chores and care work, by sex, age and location (%)"""
SL_DOM_TSPD
"""Proportion of time spent on unpaid care work, by sex, age and location (%)"""
SL_DOM_TSPDCW
"""Proportion of time spent on unpaid domestic chores, by sex, age and location (%)"""
SL_DOM_TSPDDC
"""Average hourly earnings of managers (ISCO-08) (local currency)"""
SL_EMP_AEARN
"""Fatal occupational injuries among employees, by sex and migrant status (per 100,000 employees)"""
SL_EMP_FTLINJUR
"""Labour share of GDP, comprising wages and social protection transfers (%)"""
SL_EMP_GTOTL
"""Non-fatal occupational injuries among employees, by sex and migrant status (per 100,000 employees)"""
SL_EMP_INJUR
"""Annual growth rate of real GDP per employed person (%)"""
SL_EMP_PCAP
"""Proportion of informal employment in non-agriculture employment, by sex (ILO harmonized estimates) (%)"""
SL_ISV_IFRM
"""Manufacturing employment as a proportion of total employment (%)"""
SL_TLF_MANF
"""Proportion of youth not in education, employment or training, by sex and age (%)"""
SL_TLF_NEET
"""Unemployment rate, by sex and age (%)"""
SL_TLF_UEM
"""Prevalence of undernourishment (%)"""
SN_ITK_DEFC
"""Adolescent birth rate (per 1,000 women aged 15-19 years)"""
SP_DYN_ADKL
"""Proportion of women aged 20-24 years who were married or in a union before age 15 (%)"""
SP_DYN_MRBF15
"""Proportion of women aged 20-24 years who were married or in a union before age 18 (%)"""
SP_DYN_MRBF18
"""Average tariff applied by developed countries, by type of product (%)"""
TM_TAX_ATRFD
"""Worldwide weighted tariff-average (weighted mean), by type of product and trade regime (%)"""
TM_TAX_WWTAV
"""Proportion of tariff lines applied to imports with zero-tariff (%)"""
TM_TRF_ZERO
"""Developing countries’ and least developed countries’ share of global merchandise exports (%)"""
TX_EXP_GBMRCH
"""Developing countries’ and least developed countries’ share of global services exports (%)"""
TX_EXP_GBSVR
"""Developing countries’ and least developed countries’ share of global merchandise imports (%)"""
TX_IMP_GBMRCH
"""Developing countries’ and least developed countries’ share of global services imports (%)"""
TX_IMP_GBSVR
"""Number of people affected by disaster (number)"""
VC_DSR_AFFCT
"""Direct economic loss attributed to disasters (millions of current United States dollars)"""
VC_DSR_GDPLS
"""Number of missing persons due to disaster (number)"""
VC_DSR_MISS
"""Number of deaths due to disaster (number)"""
VC_DSR_MORT
"""Number of victims of intentional homicide per 100,000 population, by sex (victims per 100,000 population)"""
VC_IHR_PSRC
"""Number of victims of intentional homicide, by sex (number)"""
VC_IHR_PSRCN
"""Unsentenced detainees as a proportion of overall prison population (%)"""
VC_PRS_UNSEC
"""Proportion of ever-partnered women and girls subjected to physical and/or sexual violence by a current or former intimate partner in the previous 12 months, by age (%)"""
VC_VAW_MARR
"""Number of cases of killings of human rights defenders, journalists and trade unionists"""
VC_VAW_MTUHRA
"""Proportion of children aged 1-14 years who experienced physical punishment and/or psychological aggression by caregivers in last month (% of children aged 1-14 years)"""
VC_VAW_PHYPYV
"""Proportion of population aged 18-29 years who experienced sexual violence by age 18, by sex (% of population aged 18-29)"""
VC_VAW_SXVLN
"""Compliance with the Basel Convention on hazardous waste and other chemicals"""
SG_HAZ_CMRBASEL
"""Compliance with the Montreal Protocol on hazardous waste and other chemicals"""
SG_HAZ_CMRMNTRL
"""Compliance with the Rotterdam Convention on hazardous waste and other chemicals"""
SG_HAZ_CMRROTDAM
"""Compliance with the Stockholm Convention on hazardous waste and other chemicals"""
SG_HAZ_CMRSTHOLM
"""Number of directly affected persons attributed to disasters per 100,000 population (number)"""
VC_DSR_DAFF
"""Number damaged dwellings attributed to disasters, by hazard type (number)"""
VC_DSR_DDHN
"""Number destroyed dwellings attributed to disasters, by hazard type (number)"""
VC_DSR_DYHN
"""Number of injured or ill people attributed to disasters (number)"""
VC_DSR_IJILN
"""Number of deaths and missing persons attributed to disasters, by hazard type (number)"""
VC_DSR_MMHN
"""Number of deaths and missing persons attributed to disasters (number)"""
VC_DSR_MTMN
"""Number of deaths and missing persons attributed to disasters per 100,000 population (number)"""
VC_DSR_MTMP
"""Number of people whose damaged dwellings were attributed to disasters (number)"""
VC_DSR_PDAN
"""Number of people whose livelihoods were disrupted or destroyed, attributed to disasters (number)"""
VC_DSR_PDLN
"""Number of people whose destroyed dwellings were attributed to disasters (number)"""
VC_DSR_PDYN
"""Score of adoption and implementation of national DRR strategies in line with the Sendai Framework"""
SG_DSR_LGRGSR
"""Number of local governments that adopt and implement local DRR strategies in line with national strategies (number)"""
SG_DSR_SILN
"""Proportion of local governments that adopt and implement local disaster risk reduction strategies in line with national disaster risk reduction strategies (%)"""
SG_DSR_SILS
"""Number of local governments (number)"""
SG_GOV_LOGV
"""Average proportion of Marine Key Biodiversity Areas (KBAs) covered by protected areas (%)"""
ER_MRN_MPA
"""National ocean science expenditure as a share of total research and development funding (%)"""
ER_RDE_OSEX
"""Extent of use of country-owned results frameworks and planning tools by providers of development cooperation - data by provider (%) """
SG_PLN_PRPOLRES
"""Extent of use of country-owned results frameworks and planning tools by providers of development cooperation - data by recipient (%) """
SG_PLN_REPOLRES
"""Prevalence of hepatitis B surface antigen (HBsAg) (%)"""
SH_HAP_HBSAG
"""Mortality rate attributed to cardiovascular disease, cancer, diabetes or chronic respiratory disease (probability)"""
SH_DTH_NCOM
"""Universal health coverage (UHC) service coverage index"""
SH_ACS_UNHC
"""Proportion of population with large household expenditures on health (greater than 10%) as a share of total household expenditure or income (%)"""
SH_XPD_EARN10
"""Proportion of population with large household expenditures on health (greater than 25%) as a share of total household expenditure or income (%)"""
SH_XPD_EARN25
"""Proportion of the target population with access to 3 doses of diphtheria-tetanus-pertussis (DTP3) (%)"""
SH_ACS_DTP3
"""Proportion of the target population with access to measles-containing-vaccine second-dose (MCV2) (%)"""
SH_ACS_MCV2
"""Proportion of the target population with access to pneumococcal conjugate 3rd dose (PCV3) (%)"""
SH_ACS_PCV3
"""International Health Regulations (IHR) capacity, by type of IHR capacity (%)"""
SH_IHR_CAPS
"""Gender parity index for youth/adults with information and communications technology (ICT) skills, by type of skill (ratio)"""
SE_GPI_ICTS
"""Gender parity index for participation rate in formal and non-formal education and training (ratio)"""
SE_GPI_PART
"""Immigration status parity index for achieving at least a fixed level of proficiency in functional skills, by numeracy/literacy skills (ratio)"""
SE_IMP_FPOF
"""Language test parity index for achievement in mathematics, by education level (ratio)"""
SE_LGP_ACHIMA
"""Language test parity index for achievement in reading, by education level (ratio)"""
SE_LGP_ACHIRE
"""Native parity index for achievement in mathematics, by education level (ratio)"""
SE_NAP_ACHIMA
"""Native parity index for achievement in reading, by education level (ratio)"""
SE_NAP_ACHIRE
"""Gender parity index for participation rate in organized learning (one year before the official primary entry age), (ratio)"""
SE_PRE_GPIPARTN
"""Proportion of population achieving at least a fixed level of proficiency in functional skills, by sex, age and type of skill (%)"""
SE_ADT_FUNS
"""Proportion of schools with access to adapted infrastructure and materials for students with disabilities, by education level (%)"""
SE_INF_DSBL
"""Proportion of groundwater bodies with good ambient water quality (%)"""
EN_H2O_GRAMBQ
"""Proportion of open water bodies with good ambient water quality (%)"""
EN_H2O_OPAMBQ
"""Proportion of river water bodies with good ambient water quality (%)"""
EN_H2O_RVAMBQ
"""Proportion of bodies of water with good ambient water quality (%)"""
EN_H2O_WBAMBQ
"""Degree of integrated water resources management implementation (%)"""
ER_H2O_IWRMD
"""Proportion of transboundary aquifers with an operational arrangement for water cooperation (%)"""
EG_TBA_H2COAQ
"""Proportion of transboundary river and lake basins with an operational arrangement for water cooperation (%)"""
EG_TBA_H2CORL
"""Proportion of transboundary basins (river and lake basins and aquifers) with an operational arrangement for water cooperation (%)"""
EG_TBA_H2CO
"""Nationally derived total extent (square kilometres)"""
EN_WBE_NDETOT
"""Nationally derived extent of open water bodies (square kilometres)"""
EN_WBE_NDOPW
"""Nationally derived quality of groundwater (%)"""
EN_WBE_NDQLGRW
"""Nationally derived quality of open water bodies(%)"""
EN_WBE_NDQLOPW
"""Nationally derived quality of river(%)"""
EN_WBE_NDQLRVR
"""Nationally derived proportion of water bodies with good quality (%)"""
EN_WBE_NDQLTOT
"""Nationally derived quantity of groundwater (millions of cubic metres per annum)"""
EN_WBE_NDQTGRW
"""Nationally derived quantity of open water bodies (million of cubic metres per annum)"""
EN_WBE_NDQTOPW
"""Nationally derived quantity of rivers (million of cubic metres per annum)"""
EN_WBE_NDQTRVR
"""Nationally derived total quantity (millions of cubic metres per annum)"""
EN_WBE_NDQTTOT
"""Nationally derived extend of rivers (square kilometres)"""
EN_WBE_NDRV
"""Nationally derived extent of wetlands (square kilometres)"""
EN_WBE_NDWTL
"""Water body extent (permanent) (square kilometres)"""
EN_WBE_PMNR
"""Water body extent (permanent and maybe permanent) (square kilometres)"""
EN_WBE_PMPN
"""Water body extent (permanent and maybe permanent) (% of total land area)"""
EN_WBE_PMPP
"""Water body extent (permanent) (% of total land area)"""
EN_WBE_PMPR
"""Countries with procedures in law or policy for participation by service users/communities in planning program in rural drinking-water supply, by level of definition in procedures (10 = Clearly defined; 5 = Not clearly defined ; 0 = NA)"""
ER_H2O_PRDU
"""Countries with users/communities participating in planning programs in rural drinking-water supply, by level of participation (3 = High; 2 = Moderate; 1 = Low; 0 = NA)"""
ER_H2O_RURP
"""Countries with users/communities participating in planning programs in water resources planning and management, by level of participation (3 = High; 2 = Moderate; 1 = Low; 0 = NA)"""
ER_WAT_PART
"""Countries with procedures in law or policy for participation by service users/communities in planning program in water resources planning and management, by level of definition in procedures (10 = Clearly defined; 5 = Not clearly defined ; 0 = NA)"""
ER_WAT_PRDU
"""Direct agriculture loss attributed to disasters, by hazard type (millions of current United States dollars)"""
VC_DSR_AGLH
"""Direct agriculture loss attributed to disasters (millions of current United States dollars)"""
VC_DSR_AGLN
"""Direct economic loss to cultural heritage damaged or destroyed attributed to disasters (millions of current United States dollars)"""
VC_DSR_CHLN
"""Proportion of small-scale industries in total industry value added (%)"""
NV_IND_SSIS
"""Proportion of small-scale industries with a loan or line of credit (%)"""
FC_ACC_SSID
"""Direct economic loss resulting from damaged or destroyed critical infrastructure attributed to disasters (millions of current United States dollars)"""
VC_DSR_CILN
"""Direct economic loss in the housing sector attributed to disasters, by hazard type (millions of current United States dollars)"""
VC_DSR_HOLH
"""Direct economic loss in the housing sector attributed to disasters (millions of current United States dollars)"""
VC_DSR_HOLN
"""Direct economic loss attributed to disasters relative to GDP (%)"""
VC_DSR_LSGP
"""Proportion of total government spending on essential services, education (%)"""
SD_XPD_ESED
"""Number of disruptions to basic services attributed to disasters (number)"""
VC_DSR_BSDN
"""Number of damaged critical infrastructure attributed to disasters (number)"""
VC_DSR_CDAN
"""Number of other destroyed or damaged critical infrastructure units and facilities attributed to disasters (number)"""
VC_DSR_CDYN
"""Number of destroyed or damaged educational facilities attributed to disasters (number)"""
VC_DSR_EFDN
"""Number of disruptions to educational services attributed to disasters (number)"""
VC_DSR_ESDN
"""Number of destroyed or damaged health facilities attributed to disasters (number)"""
VC_DSR_HFDN
"""Number of disruptions to health services attributed to disasters (number)"""
VC_DSR_HSDN
"""Number of disruptions to other basic services attributed to disasters (number)"""
VC_DSR_OBDN
"""Countries with sustainable consumption and production (SCP) national action plans or SCP mainstreamed as a priority or target into national policies (1 = YES; 0 = NO)"""
SG_SCP_CNTRY
"""Countries with coordination mechanism for sustainable consumption and production (1 = YES; 0 = NO)"""
SG_SCP_CORMEC
"""Countries with macro policy for sustainable consumption and production (1 = YES; 0 = NO)"""
SG_SCP_MACPOL
"""Countries with policy instrument for sustainable consumption and production (1 = YES; 0 = NO)"""
SG_SCP_POLINS
"""Non-performing loans to total gross loans (%)"""
FI_FSI_FSANL
"""Return on assets (%)"""
FI_FSI_FSERA
"""Regulatory capital to assets (%)"""
FI_FSI_FSKA
"""Non-performing loans net of provisions to capital (%)"""
FI_FSI_FSKNL
"""Regulatory Tier 1 capital to risk-weighted assets (%)"""
FI_FSI_FSKRTC
"""Liquid assets to short term liabilities (%)"""
FI_FSI_FSLS
"""Net open position in foreign exchange to capital (%)"""
FI_FSI_FSSNO
"""Total resource flows for development, by recipient and donor countries (millions of current United States dollars)"""
DC_TRF_TFDV
"""Fossil-fuel pre-tax subsidies (consumption and production) per capita (current United States dollars)"""
ER_FFS_PRTSPC
"""Fossil-fuel pre-tax subsidies (consumption and production) as a proportion of total GDP (%)"""
ER_FFS_PRTSPR
"""Fossil-fuel pre-tax subsidies (consumption and production) (billions of current United States dollars)"""
ER_FFS_PRTSST
"""Progress by countries in the degree of implementation of international instruments aiming to combat illegal, unreported and unregulated fishing (level of implementation: 1 lowest to 5 highest)"""
ER_REG_UNFCIM
"""Degree of application of a legal/regulatory/policy/institutional framework which recognizes and protects access rights for small-scale fisheries (level of implementation: 1 lowest to 5 highest)"""
ER_REG_SSFRAR
"""Primary government expenditures as a proportion of original approved budget (%)"""
GF_XPD_GBPC
"""Number of undernourish people (millions)"""
SN_ITK_DEFCN
"""Agriculture value added share of GDP (%)"""
AG_PRD_AGVAS
"""Agriculture share of Government Expenditure (%)"""
AG_XPD_AGSGB
"""Consumer Food Price Index"""
AG_FPA_CFPI
"""Proportion of women who make their own informed decisions regarding contraceptive use (% of women aged 15-49 years)"""
SH_FPL_INFMCU
"""Proportion of women who make their own informed decisions regarding reproductive health care (% of women aged 15-49 years)"""
SH_FPL_INFMRH
"""Proportion of women who make their own informed decisions regarding sexual relations (% of women aged 15-49 years)"""
SH_FPL_INFMSR
"""Proportion of safely treated domestic wastewater flows (%)"""
EN_WWT_WWDS
"""Water Use Efficiency (United States dollars per cubic meter)"""
ER_H2O_WUEYST
"""Unemployment rate, by sex and disability (%)"""
SL_TLF_UEMDIS
"""Proportion of children engaged in economic activity, by sex and age  (%)"""
SL_TLF_CHLDEA
"""Proportion of children engaged in economic activity and household chores, by sex and age (%)"""
SL_TLF_CHLDEC
"""Proportion of land that is degraded over total land area (%)"""
AG_LND_DGRD
"""Proportion of population using basic drinking water services, by location (%)"""
SP_ACS_BSRVH2O
"""Proportion of population using basic sanitation services, by location (%)"""
SP_ACS_BSRVSAN
"""Direct economic loss to other damaged or destroyed productive assets attributed to disasters (current United States dollars)"""
VC_DSR_DDPA
"""Productivity of small-scale food producers (agricultural output per labour day, PPP) (constant 2011 international $)"""
PD_AGR_SSFP
"""Average income of small-scale food producers, PPP (constant 2011 international $)"""
SI_AGR_SSFP
"""Proportion of local breeds classified as being at risk as a share of local breeds with known level of extinction risk (%)"""
ER_RSK_LBREDS
"""Legal frameworks that promote, enforce and monitor gender equality (percentage of achievement, 0 - 100) -- Area 3: employment and economic benefits"""
SG_LGL_GENEQEMP
"""Legal frameworks that promote, enforce and monitor gender equality (percentage of achievement, 0 - 100) -- Area 1: overarching legal frameworks and public life"""
SG_LGL_GENEQLFP
"""Legal frameworks that promote, enforce and monitor gender equality (percentage of achievement, 0 - 100) -- Area 4: marriage and family"""
SG_LGL_GENEQMAR
"""Legal frameworks that promote, enforce and monitor gender equality (percentage of achievement, 0 - 100) --  Area 2: violence against women"""
SG_LGL_GENEQVAW
"""Proportion of elected seats held by women in deliberative bodies of local government (%)"""
SG_GEN_LOCGELS
"""Proportion of countries with systems to track and make public allocations for gender equality and women's empowerment (%)"""
SG_GEN_EQPWN
"""Proportion of countries by IWRM implementation category (%)"""
ER_H2O_IWRMP
"""International financial flows to developing countries in support of clean energy research and development and renewable energy production, including in hybrid systems (millions of constant 2016 United States dollars)"""
EG_IFF_RANDN
"""Proportion of population subjected to physical violence in the previous 12 months, by sex (%)"""
VC_VOV_PHYL
"""Proportion of population subjected to robbery in the previous 12 months, by sex (%)"""
VC_VOV_ROBB
"""Proportion of population subjected to sexual violence in the previous 12 months, by sex (%)"""
VC_VOV_SEXL
"""Proportion of population that feel safe walking alone around the area they live (%)"""
VC_SNS_WALN
"""Detected victims of human trafficking, by age and sex (number)"""
VC_HTF_DETV
"""Detected victims of human trafficking for forced labour, servitude and slavery, by age and sex (number)"""
VC_HTF_DETVFL
"""Detected victims of human trafficking for removal of organ, by age and sex (number)"""
VC_HTF_DETVOG
"""Detected victims of human trafficking for other purposes, by age and sex (number)"""
VC_HTF_DETVOP
"""Detected victims of human trafficking for sexual exploitaton, by age and sex (number)"""
VC_HTF_DETVSX
"""Police reporting rate for physical assault, by sex (%)"""
VC_PRR_PHYV
"""Police reporting rate for robbery, by sex (%)"""
VC_PRR_ROBB
"""Police reporting rate for sexual assault, by sex (%)"""
VC_PRR_SEXV
"""Prevalence rate of bribery, by sex (%)"""
IU_COR_BRIB
"""Total government revenue (budgetary central government) as a proportion of GDP (%)"""
GR_G14_GDP
"""Proportion of domestic budget funded by domestic taxes (% of GDP)"""
GC_GOB_TAXD
"""Net official development assistance (ODA) as a percentage of OECD-DAC donors' GNI (grant equivalent methodology), by donor countries (%)"""
DC_ODA_TOTGGE
"""Net official development assistance (ODA) from OECD-DAC countries (grant equivalent methodology), by donor countries (millions of constant 2017 United States dollars)"""
DC_ODA_TOTLGE
}

"""The codes of the units of measurement."""
enum unitsCodes {
  """Constant 2010 United States dollars"""
  CON_10USD
  """Constant USD"""
  CON_USD
  """Current local currency"""
  CUR_LCU
  """Billions of current United States dollars"""
  CU_USD_B
  """Millions of current United States dollars"""
  CU_USD_M
  """Micrograms per cubic meter"""
  GPERM3
  """Thousands of hectares"""
  HA_TH
  """Index"""
  INDEX
  """Kilograms per constant USD"""
  KG_PER_CON_USD
  """Square kilometers"""
  KM2
  """Litres pure alcohol"""
  LITRES_PURE_ALCOHOL
  """Megajoules per USD constant 2011 PPP GDP"""
  MJ_PER_GDP_CON_PPP_USD
  """Million of cubic metres per annum"""
  M_M3_PER_YR
  """Not applicable"""
  NA
  """Number"""
  NUMBER
  """Millions"""
  NUM_M
  """Thousands"""
  NUM_TH
  """Percentage"""
  PERCENT
  """Per million population"""
  PER_1000000_POP
  """Per 100,000 employees"""
  PER_100000_EMP
  """Per 100,000 live births"""
  PER_100000_LIVE_BIRTHS
  """Per 100,000 population"""
  PER_100000_POP
  """Per 10,000 population"""
  PER_10000_POP
  """Per 1,000 live births"""
  PER_1000_LIVE_BIRTHS
  """Per 1,000 population"""
  PER_1000_POP
  """Per 1,000 uninfected population"""
  PER_1000_UNINFECTED_POP
  """Per 100 population"""
  PER_100_POP
  """% of married women aged 20-24 years"""
  PER_MARW_20T24Y
  """% of children aged 0-59 months"""
  PER_POP_U5
  """Passenger kilometres"""
  P_KM
  """Ratio"""
  RATIO
  """Tonnes"""
  TONNES
  """Millions of tonnes"""
  TONNES_M
  """Tonne kilometres"""
  T_KM
  """Tonnes per hectare"""
  T_PER_HA
  """USD"""
  USD
  """United States dollars per cubic metre"""
  USD_PER_M3
  """Millions of children aged 0-59 months"""
  NUM_U5_M
  """Millions of constant 2015 United States dollars"""
  CON_USD_M
}

"""The codes of the dimension: geoArea."""
enum geoAreaCodes {

  """Bulgaria"""
  _100

  """Myanmar"""
  _104

  """Burundi"""
  _108

  """Belarus"""
  _112

  """Cambodia"""
  _116

  """Cameroon"""
  _120

  """Canada"""
  _124

  """Cabo Verde"""
  _132

  """Cayman Islands"""
  _136

  """Central African Republic"""
  _140

  """Sri Lanka"""
  _144

  """Chad"""
  _148

  """Chile"""
  _152

  """China"""
  _156

  """Christmas Island"""
  _162

  """Cocos (Keeling) Islands"""
  _166

  """Colombia"""
  _170

  """Comoros"""
  _174

  """Mayotte"""
  _175

  """Congo"""
  _178

  """Democratic Republic of the Congo"""
  _180

  """Cook Islands"""
  _184

  """Costa Rica"""
  _188

  """Croatia"""
  _191

  """Cuba"""
  _192

  """Cyprus"""
  _196

  """Czechia"""
  _203

  """Benin"""
  _204

  """Denmark"""
  _208

  """Dominica"""
  _212

  """Dominican Republic"""
  _214

  """Ecuador"""
  _218

  """El Salvador"""
  _222

  """Equatorial Guinea"""
  _226

  """Ethiopia"""
  _231

  """Eritrea"""
  _232

  """Estonia"""
  _233

  """Faroe Islands"""
  _234

  """Falkland Islands (Malvinas)"""
  _238

  """South Georgia and the South Sandwich Islands"""
  _239

  """Fiji"""
  _242

  """Finland"""
  _246

  """Åland Islands"""
  _248

  """France"""
  _250

  """French Guiana"""
  _254

  """French Polynesia"""
  _258

  """French Southern Territories"""
  _260

  """Djibouti"""
  _262

  """Gabon"""
  _266

  """Georgia"""
  _268

  """Gambia"""
  _270

  """State of Palestine"""
  _275

  """Germany"""
  _276

  """Ghana"""
  _288

  """Gibraltar"""
  _292

  """Kiribati"""
  _296

  """Greece"""
  _300

  """Greenland"""
  _304

  """Grenada"""
  _308

  """Guadeloupe"""
  _312

  """Guam"""
  _316

  """Guatemala"""
  _320

  """Guinea"""
  _324

  """Guyana"""
  _328

  """Haiti"""
  _332

  """Heard Island and McDonald Islands"""
  _334

  """Holy See"""
  _336

  """Honduras"""
  _340

  """China, Hong Kong Special Administrative Region"""
  _344

  """Hungary"""
  _348

  """Iceland"""
  _352

  """India"""
  _356

  """Indonesia"""
  _360

  """Iran (Islamic Republic of)"""
  _364

  """Iraq"""
  _368

  """Ireland"""
  _372

  """Israel"""
  _376

  """Italy"""
  _380

  """Côte d’Ivoire"""
  _384

  """Jamaica"""
  _388

  """Japan"""
  _392

  """Kazakhstan"""
  _398

  """Jordan"""
  _400

  """Kenya"""
  _404

  """Democratic People's Republic of Korea"""
  _408

  """Republic of Korea"""
  _410

  """Kuwait"""
  _414

  """Kyrgyzstan"""
  _417

  """Lao People's Democratic Republic"""
  _418

  """Latin America and the Caribbean"""
  _419

  """Lebanon"""
  _422

  """Lesotho"""
  _426

  """Latvia"""
  _428

  """Liberia"""
  _430

  """Libya"""
  _434

  """Liechtenstein"""
  _438

  """Lithuania"""
  _440

  """Luxembourg"""
  _442

  """China, Macao Special Administrative Region"""
  _446

  """Madagascar"""
  _450

  """Malawi"""
  _454

  """Malaysia"""
  _458

  """Maldives"""
  _462

  """Mali"""
  _466

  """Malta"""
  _470

  """Martinique"""
  _474

  """Mauritania"""
  _478

  """Mauritius"""
  _480

  """Mexico"""
  _484

  """Monaco"""
  _492

  """Mongolia"""
  _496

  """Republic of Moldova"""
  _498

  """Montenegro"""
  _499

  """Montserrat"""
  _500

  """Morocco"""
  _504

  """Mozambique"""
  _508

  """Oman"""
  _512

  """Namibia"""
  _516

  """Nauru"""
  _520

  """Nepal"""
  _524

  """Netherlands"""
  _528

  """Netherlands Antilles (pre-2011)"""
  _530

  """Curaçao"""
  _531

  """Aruba"""
  _533

  """Sint Maarten (Dutch part)"""
  _534

  """Bonaire, Sint Eustatius and Saba"""
  _535

  """New Caledonia"""
  _540

  """Vanuatu"""
  _548

  """New Zealand"""
  _554

  """Nicaragua"""
  _558

  """Niger"""
  _562

  """Nigeria"""
  _566

  """Niue"""
  _570

  """Norfolk Island"""
  _574

  """Norway"""
  _578

  """Northern Mariana Islands"""
  _580

  """United States Minor Outlying Islands"""
  _581

  """Micronesia (Federated States of)"""
  _583

  """Marshall Islands"""
  _584

  """Palau"""
  _585

  """Pakistan"""
  _586

  """Panama"""
  _591

  """Papua New Guinea"""
  _598

  """Paraguay"""
  _600

  """Peru"""
  _604

  """Philippines"""
  _608

  """Pitcairn"""
  _612

  """Poland"""
  _616

  """Portugal"""
  _620

  """Guinea-Bissau"""
  _624

  """Timor-Leste"""
  _626

  """Puerto Rico"""
  _630

  """Qatar"""
  _634

  """Réunion"""
  _638

  """Romania"""
  _642

  """Russian Federation"""
  _643

  """Rwanda"""
  _646

  """Saint Barthélemy"""
  _652

  """Saint Helena"""
  _654

  """Saint Kitts and Nevis"""
  _659

  """Anguilla"""
  _660

  """Saint Lucia"""
  _662

  """Saint Martin (French Part)"""
  _663

  """Saint Pierre and Miquelon"""
  _666

  """Saint Vincent and the Grenadines"""
  _670

  """San Marino"""
  _674

  """Sao Tome and Principe"""
  _678

  """Sark"""
  _680

  """Saudi Arabia"""
  _682

  """Senegal"""
  _686

  """Serbia"""
  _688

  """Seychelles"""
  _690

  """Sierra Leone"""
  _694

  """Singapore"""
  _702

  """Slovakia"""
  _703

  """Viet Nam"""
  _704

  """Slovenia"""
  _705

  """Somalia"""
  _706

  """South Africa"""
  _710

  """Zimbabwe"""
  _716

  """Spain"""
  _724

  """South Sudan"""
  _728

  """Sudan"""
  _729

  """Western Sahara"""
  _732

  """Sudan (pre-2011)"""
  _736

  """Suriname"""
  _740

  """Svalbard and Jan Mayen Islands"""
  _744

  """Eswatini"""
  _748

  """Sweden"""
  _752

  """Switzerland"""
  _756

  """Syrian Arab Republic"""
  _760

  """Tajikistan"""
  _762

  """Thailand"""
  _764

  """Togo"""
  _768

  """Tokelau"""
  _772

  """Tonga"""
  _776

  """Trinidad and Tobago"""
  _780

  """United Arab Emirates"""
  _784

  """Tunisia"""
  _788

  """Turkey"""
  _792

  """Turkmenistan"""
  _795

  """Turks and Caicos Islands"""
  _796

  """Tuvalu"""
  _798

  """Uganda"""
  _800

  """Ukraine"""
  _804

  """North Macedonia"""
  _807

  """Egypt"""
  _818

  """United Kingdom of Great Britain and Northern Ireland"""
  _826

  """Channel Islands"""
  _830

  """Guernsey"""
  _831

  """Jersey"""
  _832

  """Isle of Man"""
  _833

  """United Republic of Tanzania"""
  _834

  """United States of America"""
  _840

  """United States Virgin Islands"""
  _850

  """Burkina Faso"""
  _854

  """Uruguay"""
  _858

  """Uzbekistan"""
  _860

  """Venezuela (Bolivarian Republic of)"""
  _862

  """Wallis and Futuna Islands"""
  _876

  """Samoa"""
  _882

  """Yemen"""
  _887

  """Zambia"""
  _894

  """Oceania"""
  _009

  """Barbados"""
  _052

  """Austria"""
  _040

  """Brazil"""
  _076

  """Bhutan"""
  _064

  """Albania"""
  _008

  """Azerbaijan"""
  _031

  """Belgium"""
  _056

  """Bahamas"""
  _044

  """Argentina"""
  _032

  """Andorra"""
  _020

  """Bolivia (Plurinational State of)"""
  _068

  """Solomon Islands"""
  _090

  """Algeria"""
  _012

  """British Virgin Islands"""
  _092

  """Bahrain"""
  _048

  """Australia"""
  _036

  """Angola"""
  _024

  """Bosnia and Herzegovina"""
  _070

  """Caribbean"""
  _029

  """Middle Africa"""
  _017

  """Brunei Darussalam"""
  _096

  """Belize"""
  _084

  """Botswana"""
  _072

  """Bermuda"""
  _060

  """American Samoa"""
  _016

  """Afghanistan"""
  _004

  """Antigua and Barbuda"""
  _028

  """Armenia"""
  _051

  """Bouvet Island"""
  _074

  """Bangladesh"""
  _050

  """British Indian Ocean Territory"""
  _086

}

"""The codes of the dimension: disabilityStatus."""
enum disabilityStatusCodes {

  """No breakdown"""
  _T

  """Persons with disability"""
  PD

  """Persons without disability"""
  PWD
}

"""The codes of the dimension: bound."""
enum boundCodes {

  """Lower bound"""
  LB

  """No breakdown"""
  _T

  """Upper bound"""
  UB
}


"""The codes of the dimension: modeOfTransportation."""
enum modeOfTransportationCodes {

  """Rail transport"""
  RAI

  """Air transport"""
  AIR

  """Road transport"""
  ROA
}

"""The codes of the dimension: hazardType."""
enum hazardTypeCodes {

  """Frost"""
  FROST

  """Nuclear Incident"""
  NUCIN

  """Snowstorm"""
  SNSTM

  """Consolidate"""
  CSOLD

  """Glacial Lake Outburst Flood"""
  GLCFL

  """Fog"""
  FOGXX

  """Sand Storm"""
  SANDS

  """Cyclone"""
  CYCLN

  """Panic"""
  PANIC

  """Heat Wave"""
  HETWA

  """Pest"""
  PESTX

  """Deforestation"""
  DFRST

  """Lahar"""
  LAHAR

  """Coastal Erosion"""
  COSER

  """Avalanche"""
  AVALE

  """Peat"""
  PEATX

  """Hailstorm"""
  HAILS

  """Heavy Rain"""
  HEVRN

  """Fire"""
  FIREX

  """Coastal Flood"""
  COSFL

  """Flood"""
  FLOOD

  """Dzud"""
  DZUD

  """Chemical Spill"""
  CHESP

  """Acid rain"""
  ACIDR

  """Technological Hazard"""
  TECHH

  """Landslide"""
  LNDSL

  """Freezing Rain"""
  FRZRN

  """Epidemics"""
  EPIDM

  """Alluvion"""
  ALLUV

  """Plague"""
  PLGUE

  """Subsidence"""
  SUBSD

  """Liquefaction"""
  LIQFN

  """Sedimentation"""
  SEDMN

  """Volcanic Eruption"""
  VOLER

  """Biological"""
  BIOGL

  """Epizootic"""
  EPIZT

  """Other"""
  OTHER

  """Animal Attack"""
  ANIAK

  """Extreme Temperature"""
  EXTEM

  """Electric Storm"""
  ELEST

  """Wild Fire"""
  WLDFR

  """Intoxication"""
  INTOX

  """Earthquake"""
  ERQAK

  """Windstorm"""
  WNDST

  """Land Degradation"""
  LNDRG

  """Pollution"""
  POLUT

  """Storm"""
  STORM

  """Tsunami"""
  TSUNM

  """Tornado"""
  TORND

  """Cold Wave"""
  COLDW

  """Erosion"""
  EROSN

  """Drought"""
  DROUG

  """Structural Collapse"""
  STCOL

  """Stuck"""
  STUCK

  """Insect Infestation"""
  INFET

  """Accident"""
  ACIDT

  """Explosion"""
  EXPLN

  """Flash Flood"""
  FLSFL

  """Contamination"""
  CONTM
}

"""The codes of the dimension: typeOfOccupation."""
enum typeOfOccupationCodes {

  """Plant and machine operators and assemblers (isco-88)"""
  isco88_8

  """Skilled agricultural and fishery workers (isco-88)"""
  isco88_6

  """All occupations (isco-88)"""
  isco88

  """Technicians and associate professionals (isco-08)"""
  isco08_3

  """Managers (isco-08)"""
  isco08_1

  """Craft and related trades workers (isco-08)"""
  isco08_7

  """Not elsewhere classified (isco-08)"""
  isco08_X

  """Service and sales workers (isco-08)"""
  isco08_5

  """Technicians and associate professionals (isco-88)"""
  isco88_3

  """Elementary occupations (isco-08)"""
  isco08_9

  """Legislators, senior officials and managers (isco-88)"""
  isco88_1

  """Craft and related trades workers (isco-88)"""
  isco88_7

  """Not elsewhere classified (isco-88)"""
  isco88_X

  """Service workers and shop and market sales workers (isco-88)"""
  isco88_5

  """Dentists"""
  DENT

  """Elementary occupations (isco-88)"""
  isco88_9

  """Pharmacists"""
  PHAR

  """Armed forces occupations (isco-08)"""
  isco08_0

  """Medical doctors"""
  PHYS

  """Clerical support workers (isco-08)"""
  isco08_4

  """Professionals (isco-08)"""
  isco08_2

  """All occupations (isco-08)"""
  isco08

  """Plant and machine operators, and assemblers (isco-08)"""
  isco08_8

  """Armed forces (isco-88)"""
  isco88_0

  """Skilled agricultural, forestry and fishery workers (isco-08)"""
  isco08_6

  """Clerks (isco-88)"""
  isco88_4

  """Nursing and midwifery personnel"""
  NURS

  """Professionals (isco-88)"""
  isco88_2
}

"""The codes of the dimension: nameOfInternationalInstitution."""
enum nameOfInternationalInstitutionCodes {

  """International Monetary Fund"""
  IMF

  """UN General Assembly"""
  UNGA

  """World Trade Organisation"""
  WTO

  """Asian Development Bank"""
  ADB

  """UN Security Council"""
  UNSC

  """African Development Bank"""
  AFDB

  """International Finance Corporation"""
  IFC

  """International Bank for Reconstruction and Development"""
  IBRD

  """Inter-American Development Bank"""
  IABD

  """Financial Stability Board"""
  FSB

  """UN Economic and Social Council"""
  ECOSOC
}

"""The codes of the dimension: educationLevel."""
enum educationLevelCodes {

  """Primary"""
  PRIMAR

  """Lower secondary"""
  LOWSEC

  """Pre-primary"""
  PREPRI

  """Grades 2/3"""
  GRAD23

  """Secondary"""
  SECOND

  """Upper secondary"""
  UPPSEC
}

"""The codes of the dimension: location."""
enum locationCodes {

  """Urban"""
  U

  """Rural"""
  R

  """No breakdown"""
  _T
}

"""The codes of the dimension: ihrCapacity."""
enum ihrCapacityCodes {

  """Laboratory"""
  IHR08

  """Points of entry"""
  IHR09

  """Coordination and National Focal Point communications"""
  IHR02

  """Radionuclear emergencies"""
  IHR13

  """Surveillance"""
  IHR03

  """Food safety"""
  IHR11

  """Chemical events"""
  IHR12

  """National legislation, policy and financing"""
  IHR01

  """Risk communication"""
  IHR06

  """Human resources"""
  IHR07

  """Response"""
  IHR04

  """Preparedness"""
  IHR05

  """ Zoonotic events"""
  IHR10

  """Human resources"""
  SPAR07

  """Surveillance"""
  SPAR06

  """Laboratory"""
  SPAR05

  """Food safety"""
  SPAR04

  """Zoonotic events and the human–animal interface"""
  SPAR03

  """IHR Coordination and National IHR Focal Point Functions"""
  SPAR02

  """Legislation and Financing"""
  SPAR01

  """Health Service Provision"""
  SPAR09

  """Points of entry"""
  SPAR11

  """Radiation emergencies"""
  SPAR13

  """Chemical events"""
  SPAR12

  """Risk Communication"""
  SPAR10

  """National Health Emergency Framework"""
  SPAR08
}

"""The codes of the dimension: typeOfSkill."""
enum typeOfSkillCodes {

  """Sending e-mails with attached files"""
  EMAIL

  """Literacy"""
  LITE

  """Connecting and installing new devices"""
  INST

  """Using copy and paste tools to duplicate or move information within a document"""
  COPA

  """Writing a computer program using a specialized programming language"""
  PCPR

  """Numeracy"""
  NUME

  """Creating electronic presentations with presentation software"""
  EPRS

  """Copying or moving a file or folder"""
  CMFL

  """Transferring files between a computer and other devices"""
  TRAF

  """Finding, downloading, installing and configuring software"""
  SOFT

  """Using basic arithmetic formula in a spreadsheet"""
  ARSP
}

"""The codes of the dimension: cities."""
enum citiesCodes {

  """Callao, Callao Cercado"""
  CALLAO_CALLAOCERCADO

  """Paris"""
  PARIS

  """Niamey"""
  NIAMEY

  """Santo Domingo de los Colorados"""
  SANTODOMINGODELOSCOLORADOS

  """Milan"""
  MILAN

  """Riyadh"""
  RIYADH

  """Budapest"""
  BUDAPEST

  """Conakry"""
  CONAKRY

  """Minsk"""
  MINSK

  """Cuauhtemoc,  Chihuahua"""
  CUAUHTEMOC_CHIHUAHUA

  """Kathmandu"""
  KATHMANDU

  """Chihuahua,  Chihuahua"""
  CHIHUAHUA_CHIHUAHUA

  """San Salvador - Apopa"""
  SANSALVADOR_APOPA

  """Singapore"""
  SINGAPORE

  """Coatzacoalcos, Veracruz"""
  COATZACOALCOS_VERACRUZ

  """Guadalupe, Zacatecas"""
  GUADALUPE_ZACATECAS

  """Bogota"""
  BOGOTA

  """Manchester"""
  MANCHESTER

  """San Salvador - Ilopango,"""
  SANSALVADOR_ILOPANGO

  """Chetumal, Othon P. Blanco, Quintana Roo"""
  CHETUMAL_OTHONP_BLANCO_QUINTANAROO

  """Gaborone"""
  GABORONE

  """Los Lagos, Puerto Montt"""
  LOSLAGOS_PUERTOMONTT

  """Maseru"""
  MASERU

  """Praia"""
  PRAIA

  """Kuwait"""
  KUWAIT

  """Vienna"""
  VIENNA

  """Parakou """
  PARAKOU

  """Zapopan, Jalisco"""
  ZAPOPAN_JALISCO

  """Berlin"""
  BERLIN

  """Mexico City"""
  MEXICOCITY

  """Iguala, Guerrero"""
  IGUALA_GUERRERO

  """Dehiwala-Mount Lavinia"""
  DEHIWALA_MOUNTLAVINIA

  """Bucaramanga"""
  BUCARAMANGA

  """Zacatecas,  Zacatecas"""
  ZACATECAS_ZACATECAS

  """Itagui"""
  ITAGUI

  """Belmopan"""
  BELMOPAN

  """Panama City"""
  PANAMACITY

  """Perth"""
  PERTH

  """Oslo"""
  OSLO

  """Ucayali, Calleria"""
  UCAYALI_CALLERIA

  """Apatzingan, Michoacan"""
  APATZINGAN_MICHOACAN

  """Victoria, Tamaulipas"""
  VICTORIA_TAMAULIPAS

  """Gold Coast"""
  GOLDCOAST

  """Buenaventura"""
  BUENAVENTURA

  """Dakar"""
  DAKAR

  """Villahermosa, Centro, Tabasco"""
  VILLAHERMOSA_CENTRO_TABASCO

  """Santiago, Santiago"""
  SANTIAGO_SANTIAGO

  """Abidjan"""
  ABIDJAN

  """Chalco, Mexico"""
  CHALCO

  """Hidalgo del Parral, Chihuahua"""
  HIDALGODELPARRAL_CHIHUAHUA

  """Bello"""
  BELLO

  """Tarapaca, Arica"""
  TARAPACA_ARICA

  """Damascus"""
  DAMASCUS

  """Acuna, Coahuila"""
  ACUNA_COAHUILA

  """Dar es Salaam"""
  DARESSALAAM

  """New York"""
  NEWYORK

  """San Miguel, San Miguel"""
  SANMIGUEL_SANMIGUEL

  """Anguilla"""
  ANGUILLA

  """Havana"""
  HAVANA

  """Cordoba, Veracruz"""
  CORDOBA_VERACRUZ

  """San Salvador - Mejicanos"""
  SANSALVADOR_MEJICANOS

  """La Paz """
  LAPAZ

  """Lisbon"""
  LISBON

  """Santa Ana, Santa Ana"""
  SANTAANA_SANTAANA

  """Addis"""
  ADDIS

  """Lima, Los Olivos"""
  LIMA_LOSOLIVOS

  """Cardenas, Tabasco"""
  CARDENAS_TABASCO

  """Montreal"""
  MONTREAL

  """Cucuta"""
  CUCUTA

  """Ulaanbaatar"""
  ULAANBAATAR

  """Coquimbo, Coquimbo"""
  COQUIMBO_COQUIMBO

  """Kampala"""
  KAMPALA

  """Quito"""
  QUITO

  """Medellin"""
  MEDELLIN

  """Antigua"""
  ANTIGUA

  """Cuautla, Morelos"""
  CUAUTLA_MORELOS

  """Antananarivo"""
  ANTANANARIVO

  """Stockholm"""
  STOCKHOLM

  """Huixquilucan, Mexico"""
  HUIXQUILUCAN

  """Maldives"""
  MALDIVES

  """Georgetown"""
  GEORGETOWN

  """Amsterdam-Utrecht"""
  AMSTERDAM_UTRECHT

  """Dublin"""
  DUBLIN

  """Zagreb"""
  ZAGREB

  """San Salvador, San Salvador"""
  SANSALVADOR_SANSALVADOR

  """Bangkok"""
  BANGKOK

  """Osaka"""
  OSAKA

  """Monrovia"""
  MONROVIA

  """Neiva"""
  NEIVA

  """Port-au-Prince"""
  PORT_AU_PRINCE

  """Guadalajara"""
  GUADALAJARA

  """Magallanes, Punta Arenas"""
  MAGALLANES_PUNTAARENAS

  """Toronto"""
  TORONTO

  """Bayamo"""
  BAYAMO

  """Ciego de avila"""
  CIEGODEAVILA

  """Lima, Carabayllo"""
  LIMA_CARABAYLLO

  """Helsinki"""
  HELSINKI

  """Windhoek"""
  WINDHOEK

  """Jakarta"""
  JAKARTA

  """Canberra"""
  CANBERRA

  """Manila"""
  MANILA

  """Cancun, Benito Juarez, Quintana Roo"""
  CANCUN_BENITOJUAREZ_QUINTANAROO

  """Tbilisi"""
  TBILISI

  """Lima, Villa Maria del Triunfo"""
  LIMA_VILLAMARIADELTRIUNFO

  """Cape Town"""
  CAPETOWN

  """Adelaide"""
  ADELAIDE

  """Valparaiso, Valparaiso"""
  VALPARAISO_VALPARAISO

  """Santiago, Providencia"""
  SANTIAGO_PROVIDENCIA

  """Aguascalientes, Aguascalientes"""
  AGUASCALIENTES

  """Thimphu"""
  THIMPHU

  """Tokyo"""
  TOKYO

  """Batumi"""
  BATUMI

  """Camaguey"""
  CAMAGUEY

  """Madrid"""
  MADRID

  """Sanaa"""
  SANAA

  """Hermosillo, Sonora"""
  HERMOSILLO_SONORA

  """Cali"""
  CALI

  """Lima, San Juan de Lurigancho"""
  LIMA_SANJUANDELURIGANCHO

  """Irapuato, Guanajuato"""
  IRAPUATO_GUANAJUATO

  """Xalapa, Veracruz"""
  XALAPA_VERACRUZ

  """Altamira, Tamaulipas"""
  ALTAMIRA_TAMAULIPAS

  """Lima, Lurigancho"""
  LIMA_LURIGANCHO

  """Corregidora"""
  CORREGIDORA

  """Carmen, Campeche"""
  CARMEN_CAMPECHE

  """Algiers"""
  ALGIERS

  """Zurich"""
  ZURICH

  """Barcelona"""
  BARCELONA

  """Buenos Aires"""
  BUENOSAIRES

  """Pereira"""
  PEREIRA

  """Tunis"""
  TUNIS

  """Brisbane"""
  BRISBANE

  """Buga"""
  BUGA

  """Dosquebradas"""
  DOSQUEBRADAS

  """Zitacuaro, Michoacan"""
  ZITACUARO_MICHOACN

  """Ouagadougou"""
  OUAGADOUGOU

  """Guasave, Sinaloa"""
  GUASAVE_SINALOA

  """Lima, Ate"""
  LIMA_ATE

  """Hidalgo, Michoacan"""
  HIDALGO_MICHOACAN

  """Dunedin"""
  DUNEDIN

  """Cotonou"""
  COTONOU

  """Comitan de Dominguez, Chiapas"""
  COMITANDEDOMINGUEZ_CHIAPAS

  """Tirana"""
  TIRANA

  """Accra"""
  ACCRA

  """Bamako"""
  BAMAKO

  """Baghdad"""
  BAGHDAD

  """Yaounde"""
  YAOUNDE

  """Bermuda"""
  BERMUDA

  """Darwin"""
  DARWIN

  """Acapulco, Guerrero"""
  ACAPULCO_GUERRERO

  """Saint Marc"""
  SAINTMARC

  """Colima, Colima"""
  COLIMA

  """Nouakchott"""
  NOUAKCHOTT

  """Sydney"""
  SYDNEY

  """Ciudad Obregon"""
  CIUDADOBREGON

  """Johannesburg"""
  JOHANNESBURG

  """Cartagena"""
  CARTAGENA

  """Campeche, Campeche"""
  CAMPECHE_CAMPECHE

  """Lima, Puente Piedra"""
  LIMA_PUENTEPIEDRA

  """Antofagasta, Antofagasta"""
  ANTOFAGASTA_ANTOFAGASTA

  """Harare"""
  HARARE

  """Lagos"""
  LAGOS

  """Kutaisi"""
  KUTAISI

  """Lima, Chorrillos"""
  LIMA_CHORRILLOS

  """All areas or breakdown by cities not available"""
  NOCITI

  """Marshall islands"""
  MARSHALLISLANDS

  """Zinder"""
  ZINDER

  """Junin, El Tambo"""
  JUNIN_ELTAMBO

  """Moratuwa"""
  MORATUWA

  """Petion Ville"""
  PETIONVILLE

  """Melbourne"""
  MELBOURNE

  """Warsaw"""
  WARSAW

  """Brussels"""
  BRUSSELS

  """Celaya, Guanajuato"""
  CELAYA_GUANAJUATO

  """Lome"""
  LOME

  """London"""
  LONDON

  """Lusaka"""
  LUSAKA

  """Piura, Castilla"""
  PIURA_CASTILLA

  """Guadalajara,  Jalisco"""
  GUADALAJARA_JALISCO

  """Les Cayes"""
  LESCAYES

  """Guanajuato, Guanajuato"""
  GUANAJUATO_GUANAJUATO

  """Kigali"""
  KIGALI

  """San Jose"""
  SANJOSE

  """Sao Paulo"""
  SAOPAULO

  """Lima, Comas"""
  LIMA_COMAS

  """Prague"""
  PRAGUE

  """La Libertad - Nueva San Salvador"""
  LALIBERTAD_NUEVASANSALVADOR

  """Wellington"""
  WELLINGTON

  """Chilpancingo, Guerrero"""
  CHILPANCINGO_GUERRERO

  """Port Louis"""
  PORTLOUIS

  """Tegucigalpa"""
  TEGUCIGALPA

  """Managua"""
  MANAGUA

  """Lima, San Borja"""
  LIMA_SANBORJA

  """Copenhagen"""
  COPENHAGEN

  """Zamora, Michoacan"""
  ZAMORA_MICHOACAN

  """San Salvador - Soyapango"""
  SANSALVADOR_SOYAPANGO

  """Hobart"""
  HOBART

  """Guaymas, Sonora"""
  GUAYMAS_SONORA

  """Guadalupe, Nuevo Leon"""
  GUADALUPE_NUEVOLEON

  """Santa Domingo"""
  SANTADOMINGO

  """Doha"""
  DOHA

  """Los Lagos, Osorno"""
  LOSLAGOS_OSORNO

  """Nairobi"""
  NAIROBI

  """Durban"""
  DURBAN

  """Christchurch"""
  CHRISTCHURCH

  """Cairo"""
  CAIRO

  """Dhaka"""
  DHAKA

  """Cigres"""
  CIGRES

  """Belo Horizonte"""
  BELOHORIZONTE

  """Varna"""
  VARNA

  """Sofia"""
  SOFIA

  """Canet"""
  CANET

  """Kunming"""
  KUNMING

  """Suzhou"""
  SUZHOU

  """Lanzhou"""
  LANZHOU

  """Athens (GAA)"""
  ATHENSGAA

  """Delhi"""
  DELHI

  """Bangalore"""
  BANGALORE

  """Warangal"""
  WARANGAL

  """Surat"""
  SURAT

  """Bishekek"""
  BISHEKEK

  """curepipe"""
  CUREPIPE

  """Huixquilucan, Mexico"""
  HUIXQUILUCAN_MEXICO

  """Cardenas, Tabasco"""
  CARDENAST_TABASCO

  """Cancun, Benito Juarez, Quintana Roo"""
  CANCUN

  """Chalco, Mexico"""
  CHALCOMEX

  """Acuna, Coahuila"""
  ACUNACOAHUILA

  """Zitacuaro, Michoacan"""
  ZITACUARO_MICHOACAN

  """Maputo"""
  MAPUTO

  """Ghorai"""
  GHORAI

  """Rotterdam"""
  ROTTERDAM

  """Lahore"""
  LAHORE

  """Castries"""
  CASTRIES

  """Steve Tshwete"""
  STEVE_TSHWETE

  """Sousse"""
  SOUSSE

  """Belfast"""
  BELFAST

  """Moshi"""
  MOSHI

  """San Franscisco"""
  SANFRANSCISCO

  """Tompkins county"""
  TOMPKINS_COUNTY
}

"""The codes of the dimension: nameOfNonCommunicableDisease."""
enum nameOfNonCommunicableDiseaseCodes {

  """Chronic respiratory disease"""
  RES

  """Diabetes"""
  DIA

  """Cardiovascular disease"""
  CAR

  """Cancer"""
  CAN
}

"""The codes of the dimension: freq."""
enum freqCodes {
  """Annual"""
  A
}


"""The codes of the dimension: sex."""
enum sexCodes {

  """No breakdown"""
  _T

  """Male"""
  M

  """Female"""
  F
}

"""The codes of the dimension: typeOfMobileTechnology."""
enum typeOfMobileTechnologyCodes {

  """At least 4G mobile network"""
  AL4G

  """At least 3G mobile network"""
  AL3G

  """At least 2G mobile network"""
  AL2G
}

"""The codes of the dimension: levelStatus."""
enum levelStatusCodes {

  """Low level of implementation"""
  LOWIMP

  """Very high level of implementation"""
  VHIGIMP

  """Moderate level of participation"""
  MOPAR

  """Not applicable"""
  NA

  """Clearly defined procedures"""
  CLDPR

  """High level of participation"""
  HIPAR

  """No data available"""
  NODATA

  """Medium-high level of implementation"""
  MHIGIMP

  """Not clearly defined procedures"""
  NCDPR

  """High level of implementation"""
  HIGIMP

  """Very low level of implementation"""
  VLOWIMP

  """Medium-low level of implementation"""
  MLOWIMP

  """Low level of participation"""
  LOPAR
}

"""The codes of the dimension: age."""
enum ageCodes {

  """16 to 65 years old"""
  Y16T65

  """2 to 14 years old"""
  Y2T14

  """under 1 year old"""
  Y0

  """16 years old and over"""
  Y_GE16

  """under 5 years old"""
  Y0T4

  """18 to 74 years old"""
  Y18T74

  """12 years old and over"""
  Y_GE12

  """6 to 59 months old"""
  M6T59

  """40 to 49 years old"""
  Y40T49

  """20 years old and over"""
  Y_GE20

  """14 to 28 years old"""
  Y14T28

  """15 to 64 years old"""
  Y15T64

  """25 to 29 years old"""
  Y25T29

  """40 to 44 years old"""
  Y40T44

  """15 to 44 years old"""
  Y15T44

  """18 to 50 years old"""
  Y18T50

  """15 to 28 years old"""
  Y15T28

  """15 to 24 years old"""
  Y15T24

  """45 to 54 years old"""
  Y45T54

  """30 to 35 years old"""
  Y30T35

  """16 to 24 years old"""
  Y16T24

  """18 to 19 years old"""
  Y18T19

  """30 to 39 years old"""
  Y30T39

  """35 to 39 years old"""
  Y35T39

  """under 8 years old"""
  Y0T7

  """1 to 4 years old"""
  Y1T4

  """25 years old and over"""
  Y_GE25

  """20 to 24 years old"""
  Y20T24

  """7 to 17 years old"""
  Y7T17

  """65 years old and over"""
  Y_GE65

  """5 to 14 years old"""
  Y5T14

  """20 to 64 years old"""
  Y20T64

  """20 to 29 years old"""
  Y20T29

  """30 to 70 years old"""
  Y30T70

  """25 to 34 years old"""
  Y25T34

  """15 to 29 years old"""
  Y15T29

  """45 to 49 years old"""
  Y45T49

  """15 to 49 years old"""
  Y15T49

  """30 to 34 years old"""
  Y30T34

  """35 to 44 years old"""
  Y35T44

  """18 years old and over"""
  Y_GE18

  """14 years old and over"""
  Y_GE14

  """10 to 17 years old"""
  Y10T17

  """10 years old and over"""
  Y_GE10

  """5 to 17 years old"""
  Y5T17

  """18 to 24 years old"""
  Y18T24

  """36 to 59 months old"""
  M36T59

  """36 to 47 months old"""
  M36T47

  """45 to 64 years old"""
  Y45T64

  """6 years old and over"""
  Y_GE6

  """6 to 17 years old"""
  Y6T17

  """18 to 29 years old"""
  Y18T29

  """18 to 49 years old"""
  Y18T49

  """No breakdown"""
  _T

  """under 15 years old"""
  Y0T14

  """under 6 years old"""
  Y0T5

  """55 to 64 years old"""
  Y55T64

  """15 years old and over"""
  Y_GE15

  """20 to 74 years old"""
  Y20T74

  """50 years old and over"""
  Y_GE50

  """1 to 14 years old"""
  Y1T14

  """under 1 month old"""
  M0

  """12 to 24 years old"""
  Y12T24

  """25 to 44 years old"""
  Y25T44

  """45 to 59 years old"""
  Y45T59

  """5 years old and over"""
  Y_GE5

  """15 to 19 years old"""
  Y15T19

  """6 to 65 years old"""
  T6T65

  """under 18 years old"""
  Y0T17

  """65 to 74 years old"""
  Y65T74

  """75 to 84 years old"""
  Y75T84

  """85 years old and over"""
  Y_GE85

  """12 to 14 years old"""
  Y12T14

  """10 to 14 years old"""
  Y10T14
}

"""The codes of the dimension: typeOfProduct."""
enum typeOfProductCodes {

  """Rice"""
  RIC

  """Ferrous ores"""
  FEO

  """Millet"""
  MIL

  """Non-metallic minerals"""
  NMM

  """Non-metallic minerals - construction dominant"""
  NMC

  """Non-metallic minerals - industrial or agricultural dominant"""
  NMA

  """Biomass"""
  BIM

  """Crop residues"""
  CPR

  """Wood"""
  WOD

  """All raw materials"""
  RAW

  """Maize"""
  MAZ

  """Crops"""
  CRO

  """Coal"""
  COL

  """Sorghum"""
  SOR

  """Petroleum"""
  PET

  """Wheat"""
  WHE

  """Fossil fuels"""
  FOF

  """Natural gas"""
  GAS

  """Oil shale and tar sands"""
  ONT

  """Wild catch and harvest"""
  WCH

  """Non-ferrous ores"""
  NFO

  """Metal ores"""
  MEO

  """Grazed biomass and fodder crops"""
  GBO

  """Agricultural products"""
  AGR

  """All products"""
  ALP

  """Clothing"""
  CLO

  """Industrial products"""
  IND

  """Textiles"""
  TEX

  """Arms"""
  ARM

  """Oil"""
  OIL
}

"""The codes of the dimension: migratoryStatus."""
enum migratoryStatusCodes {

  """EU Migrants"""
  MS_EUMIGRANT

  """Non-EU Migrants"""
  MS_NONEUMIGRANT

  """Non-migrant"""
  NONMIG

  """No breakdown"""
  _T

  """Migrants"""
  MIGPER
}

"""The codes of the dimension: typeOfSpeed."""
enum typeOfSpeedCodes {

  """Between 256 kbps and 2 mbps"""
  _256KT2MBPS

  """10 mbps and over"""
  _10MBPS

  """Between 2 mbps and 10 mbps"""
  _2MT10MBPS

  """Any speed"""
  ANYS
}


`

module.exports = schemaString



