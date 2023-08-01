import { IonAccordion, IonAccordionGroup, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonListHeader, IonMenuButton, IonPage, IonRange, IonRow, IonSearchbar, IonSegment, IonSegmentButton, IonSelect, IonSelectOption, IonText, IonTextarea, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import { accessibilityOutline, alarmOutline, businessOutline, calendarNumberOutline, calendarOutline, callOutline, caretForwardOutline, checkmarkCircleOutline, closeCircleOutline, closeOutline, eyeOffOutline, pinOutline, readerOutline, refreshOutline, scaleOutline, thermometerOutline } from 'ionicons/icons';
import moment from 'moment-timezone';
import Call, { Patient, PatientRange,RangeValue } from '../calls/Patient';
import React, { Suspense, useEffect, useState } from 'react';
import { useUserContext } from '../context/UserContext';
import Skeleton from '../components/test/Skeleton';
import LazyComponent from '../components/LazyComponent';


interface Assessment{
  name:string
  component?:string
}
const visitTypes=[
  {name:"General Medicine", assessments:[
    {"name": "Common cold", "component": "assessments/General"},
    {"name": "Influenza (Flu)", "component": "assessments/General"},
    {"name": "Hypertension (High blood pressure)", "component": "assessments/General"},
    {"name": "Type 2 Diabetes", "component": "assessments/General"},
    {"name": "Hypercholesterolemia (High cholesterol)", "component": "assessments/General"},
    {"name": "Hypothyroidism", "component": "assessments/General"},
    {"name": "Gastroenteritis", "component": "assessments/General"},
    {"name": "Gastroesophageal reflux disease (GERD)", "component": "assessments/General"},
    {"name": "Anemia", "component": "assessments/General"},
    {"name": "Urinary tract infection (UTI)", "component": "assessments/General"},
    {"name": "Bronchitis", "component": "assessments/General"},
    {"name": "Pneumonia", "component": "assessments/General"},
    {"name": "Allergies", "component": "assessments/General"},
    {"name": "Migraine", "component": "assessments/General"},
    {"name": "Depression", "component": "assessments/General"},
    {"name": "Anxiety disorders", "component": "assessments/General"},
    {"name": "Insomnia", "component": "assessments/General"},
    {"name": "Osteoarthritis", "component": "assessments/General"},
    {"name": "Back pain", "component": "assessments/General"}
  ]},
  {name:"Cardiology", assessments: [
    {"name": "Coronary artery disease (CAD)", "component": "assessments/General"},
    {"name": "Arrhythmia", "component": "assessments/General"},
    {"name": "Congestive heart failure (CHF)", "component": "assessments/General"},
    {"name": "Valvular heart disease", "component": "assessments/General"},
    {"name": "Myocardial infarction (Heart attack)", "component": "assessments/General"},
    {"name": "Hypertrophic cardiomyopathy", "component": "assessments/General"},
    {"name": "Atrial fibrillation", "component": "assessments/General"},
    {"name": "Peripheral artery disease (PAD)", "component": "assessments/General"},
    {"name": "Pulmonary embolism", "component": "assessments/General"},
    {"name": "Angina pectoris", "component": "assessments/General"},
    {"name": "Cardiomyopathy", "component": "assessments/General"}
  ]},
  {name:"Ophthalmology", assessments:  [
    {"name": "Myopia (Nearsightedness)", "component": "assessments/General"},
    {"name": "Hyperopia (Farsightedness)", "component": "assessments/General"},
    {"name": "Cataracts", "component": "assessments/General"},
    {"name": "Glaucoma", "component": "assessments/General"},
    {"name": "Conjunctivitis (Pink eye)", "component": "assessments/General"},
    {"name": "Macular degeneration", "component": "assessments/General"},
    {"name": "Dry eye syndrome", "component": "assessments/General"},
    {"name": "Astigmatism", "component": "assessments/General"},
    {"name": "Retinal detachment", "component": "assessments/General"},
    {"name": "Amblyopia (Lazy eye)", "component": "assessments/General"},
    {"name": "Strabismus (Crossed eyes)", "component": "assessments/General"}
  ]},
  {name:"Gynecology", assessments:  [
    {"name": "Menstrual disorders", "component": "assessments/General"},
    {"name": "Endometriosis", "component": "assessments/General"},
    {"name": "Polycystic ovary syndrome (PCOS)", "component": "assessments/General"},
    {"name": "Cervical dysplasia", "component": "assessments/General"},
    {"name": "Uterine fibroids", "component": "assessments/General"},
    {"name": "Premenstrual syndrome (PMS)", "component": "assessments/General"},
    {"name": "Pelvic inflammatory disease (PID)", "component": "assessments/General"},
    {"name": "Ovarian cysts", "component": "assessments/General"},
    {"name": "Vaginal yeast infection", "component": "assessments/General"},
    {"name": "Pelvic organ prolapse", "component": "assessments/General"},
    {"name": "Menopause", "component": "assessments/General"}
  ]},
  {name:"Urology", assessments:  [
    {"name": "Kidney stones", "component": "assessments/General"},
    {"name": "Benign prostatic hyperplasia (BPH)", "component": "assessments/General"},
    {"name": "Urinary incontinence", "component": "assessments/General"},
    {"name": "Erectile dysfunction (ED)", "component": "assessments/General"},
    {"name": "Bladder cancer", "component": "assessments/General"},
    {"name": "Urinary tract infection (UTI)", "component": "assessments/General"},
    {"name": "Prostate cancer", "component": "assessments/General"},
    {"name": "Testicular cancer", "component": "assessments/General"},
    {"name": "Interstitial cystitis (Painful bladder syndrome)", "component": "assessments/General"},
    {"name": "Varicocele", "component": "assessments/General"}
  ]},
  {name:"Pediatrics", assessments:  [
    {"name": "Ear infection (Otitis media)", "component": "assessments/General"},
    {"name": "Strep throat", "component": "assessments/General"},
    {"name": "Bronchiolitis", "component": "assessments/General"},
    {"name": "Asthma", "component": "assessments/General"},
    {"name": "Growth and developmental concerns", "component": "assessments/General"},
    {"name": "Immunization schedules", "component": "assessments/General"},
    {"name": "Childhood obesity", "component": "assessments/General"},
    {"name": "Attention-deficit/hyperactivity disorder (ADHD)", "component": "assessments/General"},
    {"name": "Autism spectrum disorder (ASD)", "component": "assessments/General"},
    {"name": "Childhood asthma", "component": "assessments/General"},
    {"name": "Pediatric diabetes", "component": "assessments/General"}
  ]},
  {name:"Dentistry", assessments:  [
    {"name": "Cavities (Dental caries)", "component": "assessments/General"},
    {"name": "Gingivitis", "component": "assessments/General"},
    {"name": "Periodontitis (Gum disease)", "component": "assessments/General"},
    {"name": "Tooth abscess", "component": "assessments/General"},
    {"name": "Tooth sensitivity", "component": "assessments/General"},
    {"name": "Dental erosion", "component": "assessments/General"},
    {"name": "Malocclusion (Misaligned teeth)", "component": "assessments/General"},
    {"name": "Bruxism (Teeth grinding)", "component": "assessments/General"},
    {"name": "Dental crowding", "component": "assessments/General"},
    {"name": "Oral thrush", "component": "assessments/General"},
    {"name": "Dry socket", "component": "assessments/General"}
  ]},
  {name:"Otorhinolaryngology (ENT)", assessments:  [
    {"name": "Ear infection (Otitis media)", "component": "assessments/General"},
    {"name": "Sinusitis", "component": "assessments/General"},
    {"name": "Tonsillitis", "component": "assessments/General"},
    {"name": "Allergic rhinitis (Hay fever)", "component": "assessments/General"},
    {"name": "Hearing loss", "component": "assessments/General"},
    {"name": "Vertigo", "component": "assessments/General"},
    {"name": "Snoring and sleep apnea", "component": "assessments/General"},
    {"name": "Gastroesophageal reflux disease (GERD)", "component": "assessments/General"},
    {"name": "Laryngitis", "component": "assessments/General"},
    {"name": "Nasal polyps", "component": "assessments/General"},
    {"name": "Deviated septum", "component": "assessments/General"}
  ]},
  {name:"Orthopedics", assessments:  [
    {"name": "Fractures", "component": "assessments/General"},
    {"name": "Sprains and strains", "component": "assessments/General"},
    {"name": "Osteoarthritis", "component": "assessments/General"},
    {"name": "Rheumatoid arthritis", "component": "assessments/General"},
    {"name": "Tendinitis", "component": "assessments/General"},
    {"name": "Carpal tunnel syndrome", "component": "assessments/General"},
    {"name": "Sciatica", "component": "assessments/General"},
    {"name": "Scoliosis", "component": "assessments/General"},
    {"name": "Herniated disc", "component": "assessments/General"},
    {"name": "Frozen shoulder", "component": "assessments/General"},
    {"name": "Plantar fasciitis", "component": "assessments/General"}
  ]},
  {name:"Neurology", assessments: [
    {"name": "Migraine", "component": "assessments/General"},
    {"name": "Epilepsy", "component": "assessments/General"},
    {"name": "Stroke", "component": "assessments/General"},
    {"name": "Alzheimer's disease", "component": "assessments/General"},
    {"name": "Parkinson's disease", "component": "assessments/General"},
    {"name": "Multiple sclerosis (MS)", "component": "assessments/General"},
    {"name": "Peripheral neuropathy", "component": "assessments/General"},
    {"name": "Bell's palsy", "component": "assessments/General"},
    {"name": "Cluster headache", "component": "assessments/General"},
    {"name": "Myasthenia gravis", "component": "assessments/General"},
    {"name": "Amyotrophic lateral sclerosis (ALS)", "component": "assessments/General"}
  ]},
  {name:"Psychology/Psychiatry", assessments: [
    {"name": "Depression", "component": "assessments/General"},
    {"name": "Anxiety disorders", "component": "assessments/General"},
    {"name": "Bipolar disorder", "component": "assessments/General"},
    {"name": "Schizophrenia", "component": "assessments/General"},
    {"name": "Eating disorders", "component": "assessments/General"},
    {"name": "Obsessive-compulsive disorder (OCD)", "component": "assessments/General"},
    {"name": "Post-traumatic stress disorder (PTSD)", "component": "assessments/General"},
    {"name": "Attention-deficit/hyperactivity disorder (ADHD)", "component": "assessments/General"},
    {"name": "Social anxiety disorder", "component": "assessments/General"},
    {"name": "Panic disorder", "component": "assessments/General"},
    {"name": "Borderline personality disorder", "component": "assessments/General"}
  ]},
  {name:"Endocrinology", assessments: [
    {"name": "Thyroid disorders", "component": "assessments/General"},
    {"name": "Type 1 Diabetes", "component": "assessments/General"},
    {"name": "Type 2 Diabetes", "component": "assessments/General"},
    {"name": "Hyperthyroidism", "component": "assessments/General"},
    {"name": "Hypothyroidism", "component": "assessments/General"},
    {"name": "Adrenal insufficiency", "component": "assessments/General"},
    {"name": "Cushing's syndrome", "component": "assessments/General"},
    {"name": "Pituitary adenoma", "component": "assessments/General"},
    {"name": "Gestational diabetes", "component": "assessments/General"},
    {"name": "Polycystic ovary syndrome (PCOS)", "component": "assessments/General"},
    {"name": "Hyperparathyroidism", "component": "assessments/General"}
  ]},
  {name:"Gastroenterology", assessments: [
    {"name": "Gastritis", "component": "assessments/General"},
    {"name": "Peptic ulcers", "component": "assessments/General"},
    {"name": "Gastroesophageal reflux disease (GERD)", "component": "assessments/General"},
    {"name": "Irritable bowel syndrome (IBS)", "component": "assessments/General"},
    {"name": "Inflammatory bowel disease (IBD)", "component": "assessments/General"},
    {"name": "Gallstones", "component": "assessments/General"},
    {"name": "Hepatitis", "component": "assessments/General"},
    {"name": "Pancreatitis", "component": "assessments/General"},
    {"name": "Celiac disease", "component": "assessments/General"},
    {"name": "Crohn's disease", "component": "assessments/General"},
    {"name": "Ulcerative colitis", "component": "assessments/General"}
  ]},
  {name:"Pulmonology", assessments: [
    {"name": "Asthma", "component": "assessments/General"},
    {"name": "Chronic obstructive pulmonary disease (COPD)", "component": "assessments/General"},
    {"name": "Pneumonia", "component": "assessments/General"},
    {"name": "Lung cancer", "component": "assessments/General"},
    {"name": "Obstructive sleep apnea", "component": "assessments/General"},
    {"name": "Pulmonary embolism", "component": "assessments/General"},
    {"name": "Bronchitis", "component": "assessments/General"},
    {"name": "Pleural effusion", "component": "assessments/General"},
    {"name": "Interstitial lung disease", "component": "assessments/General"},
    {"name": "Pulmonary fibrosis", "component": "assessments/General"},
    {"name": "Tuberculosis", "component": "assessments/General"}
  ]},
  {name:"Oncology", assessments: [
    {"name": "Breast cancer", "component": "assessments/General"},
    {"name": "Prostate cancer", "component": "assessments/General"},
    {"name": "Colon cancer", "component": "assessments/General"},
    {"name": "Lung cancer", "component": "assessments/General"},
    {"name": "Leukemia", "component": "assessments/General"},
    {"name": "Pancreatic cancer", "component": "assessments/General"},
    {"name": "Ovarian cancer", "component": "assessments/General"},
    {"name": "Bladder cancer", "component": "assessments/General"},
    {"name": "Liver cancer", "component": "assessments/General"},
    {"name": "Kidney cancer", "component": "assessments/General"},
    {"name": "Lymphoma", "component": "assessments/General"}
  ]},
  {name:"Rheumatology", assessments: [
    {"name": "Rheumatoid arthritis", "component": "assessments/General"},
    {"name": "Osteoarthritis", "component": "assessments/General"},
    {"name": "Lupus", "component": "assessments/General"},
    {"name": "Spondyloarthritis", "component": "assessments/General"},
    {"name": "Gout", "component": "assessments/General"},
    {"name": "Systemic sclerosis (Scleroderma)", "component": "assessments/General"},
    {"name": "Ankylosing spondylitis", "component": "assessments/General"},
    {"name": "Polymyalgia rheumatica", "component": "assessments/General"},
    {"name": "Juvenile idiopathic arthritis", "component": "assessments/General"},
    {"name": "Fibromyalgia", "component": "assessments/General"},
    {"name": "Mixed connective tissue disease", "component": "assessments/General"}
  ]},
  {name:"Immunology", assessments: [
    {"name": "Allergies", "component": "assessments/General"},
    {"name": "Autoimmune diseases", "component": "assessments/General"},
    {"name": "Immunodeficiency disorders", "component": "assessments/General"},
    {"name": "Human immunodeficiency virus (HIV)", "component": "assessments/General"},
    {"name": "Vaccination", "component": "assessments/General"},
    {"name": "Systemic lupus erythematosus (SLE)", "component": "assessments/General"},
    {"name": "Rheumatoid arthritis", "component": "assessments/General"},
    {"name": "Multiple sclerosis (MS)", "component": "assessments/General"},
    {"name": "Type 1 diabetes", "component": "assessments/General"},
    {"name": "Inflammatory bowel disease (IBD)", "component": "assessments/General"},
    {"name": "Psoriasis", "component": "assessments/General"}
  ]},
  {name:"Hematology", assessments: [
    {"name": "Anemia", "component": "assessments/General"},
    {"name": "Hemophilia", "component": "assessments/General"},
    {"name": "Thrombocytopenia", "component": "assessments/General"},
    {"name": "Leukemia", "component": "assessments/General"},
    {"name": "Lymphoma", "component": "assessments/General"},
    {"name": "Sickle cell disease", "component": "assessments/General"},
    {"name": "Myelodysplastic syndromes (MDS)", "component": "assessments/General"},
    {"name": "Multiple myeloma", "component": "assessments/General"},
    {"name": "Hodgkin's lymphoma", "component": "assessments/General"},
    {"name": "Polycythemia vera", "component": "assessments/General"},
    {"name": "Thalassemia", "component": "assessments/General"}
  ]},
  {name:"Nephrology", assessments: [
    {"name": "Chronic kidney disease (CKD)", "component": "assessments/General"},
    {"name": "Kidney stones", "component": "assessments/General"},
    {"name": "Acute kidney injury (AKI)", "component": "assessments/General"},
    {"name": "Polycystic kidney disease (PKD)", "component": "assessments/General"},
    {"name": "Glomerulonephritis", "component": "assessments/General"},
    {"name": "Urinary tract infection (UTI)", "component": "assessments/General"},
    {"name": "Nephrotic syndrome", "component": "assessments/General"},
    {"name": "Renal artery stenosis", "component": "assessments/General"},
    {"name": "Hydronephrosis", "component": "assessments/General"},
    {"name": "Hematuria (blood in urine)", "component": "assessments/General"},
    {"name": "Kidney cancer", "component": "assessments/General"}
  ]},
  {name:"Gynecologic Oncology", assessments: [
    {"name": "Cervical cancer", "component": "assessments/General"},
    {"name": "Ovarian cancer", "component": "assessments/General"},
    {"name": "Endometrial cancer", "component": "assessments/General"},
    {"name": "Vaginal cancer", "component": "assessments/General"},
    {"name": "Vulvar cancer", "component": "assessments/General"},
    {"name": "Fallopian tube cancer", "component": "assessments/General"},
    {"name": "Gestational trophoblastic disease", "component": "assessments/General"},
    {"name": "Uterine sarcoma", "component": "assessments/General"},
    {"name": "Primary peritoneal cancer", "component": "assessments/General"},
    {"name": "Placental site trophoblastic tumor", "component": "assessments/General"},
    {"name": "Ovarian germ cell tumors", "component": "assessments/General"}
  ]},
  {name:"Hepatology", assessments: [
    {"name": "Hepatitis B", "component": "assessments/General"},
    {"name": "Hepatitis C", "component": "assessments/General"},
    {"name": "Alcoholic liver disease", "component": "assessments/General"},
    {"name": "Nonalcoholic fatty liver disease (NAFLD)", "component": "assessments/General"},
    {"name": "Cirrhosis", "component": "assessments/General"},
    {"name": "Liver cancer", "component": "assessments/General"},
    {"name": "Hemochromatosis", "component": "assessments/General"},
    {"name": "Primary biliary cholangitis", "component": "assessments/General"},
    {"name": "Primary sclerosing cholangitis", "component": "assessments/General"},
    {"name": "Wilson's disease", "component": "assessments/General"},
    {"name": "Autoimmune hepatitis", "component": "assessments/General"}
  ]},
  {name:"Allergy and Immunology", assessments: [
    {"name": "Allergies", "component": "assessments/General"},
    {"name": "Asthma", "component": "assessments/General"},
    {"name": "Anaphylaxis", "component": "assessments/General"},
    {"name": "Food allergies", "component": "assessments/General"},
    {"name": "Hay fever (Allergic rhinitis)", "component": "assessments/General"},
    {"name": "Atopic dermatitis (Eczema)", "component": "assessments/General"},
    {"name": "Hives (Urticaria)", "component": "assessments/General"},
    {"name": "Angioedema", "component": "assessments/General"},
    {"name": "Insect sting allergies", "component": "assessments/General"},
    {"name": "Drug allergies", "component": "assessments/General"},
    {"name": "Immune deficiency disorders", "component": "assessments/General"}
  ]},
  {name:"Dermatologic", component:'dermatology/Visit', assessments: [
    {name:"Acne (Acne vulgaris)",component:'dermatology/assessments/AcneEdit'},
    {name:"Atopic Dermatitis (Eczema)","component": "assessments/General"},
    {name:"Psoriasis","component": "assessments/General"},
    {name:"Skin Infections (e.g., Impetigo, Cellulitis, Folliculitis)","component": "assessments/General"},
    {name:"Warts (e.g., Common Warts, Plantar Warts)",component:'dermatology/assessments/warts/Edit'},
    {name:"Tinea Corporis (Ringworm)","component": "assessments/General"},
    {name:"Urticaria (Hives)","component": "assessments/General"},
    {name:"Herpes Simplex (Cold Sores, Genital Herpes)","component": "assessments/General"},
    {name:"Scabies","component": "assessments/General"},
    {name:"Rosacea","component": "assessments/General"},
    {name:"Melasma","component": "assessments/General"},
    {name:"Vitiligo","component": "assessments/General"},
    {name:"Freckles (Ephelides)","component": "assessments/General"},
    {name:"Melanoma","component": "assessments/General"},
    {name:"Nevus (Pigmented Nevi, commonly known as 'moles')","component": "assessments/General"},
    {name:"Seborrheic Keratosis","component": "assessments/General"},
    {name:"Paget's Disease of the Nipple","component": "assessments/General"},
    {name:"Itching (Pruritus)","component": "assessments/General"},
    {name:"Erythema Nodosum","component": "assessments/General"},
    {name:"Molluscum Contagiosum","component": "assessments/General"},
    {name:"Lichen Planus","component": "assessments/General"},
    {name:"Contact Dermatitis","component": "assessments/General"},
    {name:"Pemphigus","component": "assessments/General"},
    {name:"Bullous Pemphigoid","component": "assessments/General"},
    {name:"Scleroderma","component": "assessments/General"},
    {name:"Seborrheic Dermatitis","component": "assessments/General"},
    {name:"Alopecia (Hair Loss)","component": "assessments/General"},
    {name:"Pityriasis Rosea","component": "assessments/General"},
    {name:"Erythema Multiforme","component": "assessments/General"},
    {name:"Drug Eruption Syndromes","component": "assessments/General"}
  ]}
]


interface RangeData extends RangeValue{
  enableRange:boolean,
}
const RangeView:React.FC<RangeData>=({unit,min,max,value,enableRange})=>{
  return <>
          {enableRange?<>
          <IonRange className='ion-no-padding' {...{min:min, max:max,value:value}}>
            {min&&<IonLabel slot="start">{min}</IonLabel>}
            {max&&<IonLabel slot="end">{max}</IonLabel>}
          </IonRange>
          <IonLabel slot='end'>{value} {unit}</IonLabel>              
          </>:<IonLabel slot='end'>{value} {unit}</IonLabel>}
          </>
}


interface ValueData extends RangeValue{
  last:boolean,
  name:string  
  enableRange:boolean,
  children?: JSX.Element,
}
const Value:React.FC<ValueData>=({min,max,value,unit,children,last,enableRange,name})=>{  
  return <IonItem lines={last?'none':'full'}>
              {(!min || value>min) && (!max|| value<max)?
              <IonIcon  slot='start' icon={checkmarkCircleOutline} color="success" className="card-icon"/>:
              <IonIcon  slot='start' icon={closeCircleOutline} color="warning" className="card-icon"/>}
              <IonLabel>{name}</IonLabel>              
              <RangeView {...{min,max,value,children,unit}} enableRange={enableRange}/>                
            </IonItem>                          
}
interface ItemData extends RangeValue{
  name:string,
}
interface Group{
  name:string,
  items:ItemData[],
  onlyWarning:boolean,  
  enableRange:boolean,
  children?: JSX.Element,
}
const Group:React.FC<Group>=({items,children,name,  onlyWarning, enableRange})=>{  
  
  var warnings = items.filter(item=>!((!item.min || item.value>item.min) && (!item.max|| item.value<item.max)))
  if(warnings.length==0 &&  onlyWarning) return <></>
  if(onlyWarning) items=warnings;
  return <IonCol size='12' size-lg='4'>
        <IonCard>
          <IonCardHeader>            
            <IonCardTitle>{name}</IonCardTitle>                         
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              {items.map((item,index)=><Value {...item} enableRange={enableRange} last={items.length==index+1}/> )}
            </IonList>
          </IonCardContent>        
        </IonCard> 
      </IonCol>      
}

interface Visit{
  assessments:Assessment[];
  component?:string
}
const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string; }>();
  const { user, updateUser } = useUserContext();  
  
  var [visitType,setVisitType] =useState<string>("");
  var [assessmentSearch,setAssessmentSearch] =useState<string>('');
  var [assessment,setAssessment] =useState<Assessment|null>(null);

  var [patient,setPatient] =useState<PatientRange|null>(null);
  var [range,enableRange] =useState<boolean>(false);
  var [onlyWarning,enableOnlyWarning] =useState<boolean>(true);
  var [visit,setVisit] =useState<Visit>({
    assessments:[]
  });
  

  useEffect(()=>{    
    Call.getPatientRanges(user?.dataId||'').then(patient=>{      
      setPatient(patient)
    })
  },[])

  useEffect(()=>{    
    setAssessmentSearch(' ')
    if(assessment==null) return;

    visit.assessments.push(assessment)
    setVisit({...visit})
  },[assessment])

  useEffect(()=>{    
    setAssessmentSearch('')
    setAssessment(null)

    var visit =visitTypes.find(visit=>visit.name==visitType)
    setVisit({component:visit?.component,assessments:[]})
  },[visitType])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{id}</IonTitle>
        </IonToolbar>
      </IonHeader>

      {patient&&
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">DashBoard</IonTitle> 
          </IonToolbar>
        </IonHeader>

  <IonGrid>
  <IonRow>
    <IonCol size='12' size-lg='4'>
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>
          {patient?.first_name} {patient?.last_name}
        </IonCardTitle>                       
      </IonCardHeader>
      <IonCardContent>
      
   
            <IonItem>
              <IonIcon  slot='start' icon={eyeOffOutline} className="card-icon"/>
              <IonLabel>Only warning</IonLabel>
              <IonToggle checked={onlyWarning} onIonChange={(e)=>enableOnlyWarning(e.detail.checked)} enableOnOffLabels={true}/>
            </IonItem>
        <IonItem>
          <IonIcon  slot='start' icon={calendarOutline} className="card-icon"/>
          <IonLabel>Birth</IonLabel>
          <IonLabel slot='end'>{moment(patient?.birth_date).format('MMMM DD yyyy')}
          <p className='ion-text-right'>{moment().diff(patient?.birth_date, 'years')} years</p>
          </IonLabel>                
        </IonItem>
        <IonItem>
          <IonIcon  slot='start' icon={pinOutline} className="card-icon"/>
          <IonLabel>Height</IonLabel>
          <IonLabel slot='end'>{patient?.bodyHeight} cm</IonLabel>                
        </IonItem>
        <IonItem>
          <IonIcon  slot='start' icon={scaleOutline} className="card-icon"/>
          <IonLabel>Weigth</IonLabel>                            
          <IonLabel slot='end' className='ion-text-right'>{patient?.bodyWeight} Kg
          <p className='ion-text-right'>BMI: { (((patient.bodyWeight) / (patient.bodyHeight * patient.bodyHeight))* 10000).toFixed(2)}</p></IonLabel>                
        </IonItem>
        <IonItem>
          <IonIcon  slot='start' icon={thermometerOutline} className="card-icon"/>
          <IonLabel>Temperature</IonLabel>
          <IonLabel slot='end'>{patient?.bodyTemperature} C</IonLabel>                
        </IonItem>
        

      </IonCardContent>        
    </IonCard>  
    </IonCol>    
    <Group 
      name="Last Vital Signs" 
      onlyWarning={onlyWarning}  
      enableRange={range}
      items={[
        {...patient?.bloodPressure?.Diastolic,name:"Diastolic"},
        {...patient?.bloodPressure?.Systolic,name:"Systolic"},
        {...patient?.heartRate,name:"Hearth Rate"},
        {...patient?.oxygenSaturation,name:"Oxygen Saturation"}
      ]}
      />

  <Group 
      name="Blood - Cholesterol" 
      onlyWarning={onlyWarning}  
      enableRange={range}
      items={[
        {...patient.cholesterol.Total,name:"Total"},
        {...patient.cholesterol.HDL,name:"HDL"},
        {...patient.cholesterol.LDL,name:"LDL"},
        {...patient.cholesterol.Triglycerides,name:"Triglycerides"}
      ]}
      />
    <Group 
      name="Electrolytes" 
      onlyWarning={onlyWarning}  
      enableRange={range}
      items={[
        {...patient.electrolytes.Calcium,name:"Calcium"},        
        {...patient.electrolytes.Magnesium,name:"Magnesium"},        
        {...patient.electrolytes.Phosphorus,name:"Phosphorus"},        
        {...patient.electrolytes.Potassium,name:"Potassium"},        
        {...patient.electrolytes.Sodium,name:"Sodium"}
      ]}
      />
  
  <Group 
      name="Kidney Function" 
      onlyWarning={onlyWarning}  
      enableRange={range}
      items={[
        {...patient.kidneyFunction['Blood Urea Nitrogen (BUN)'],name:"Blood Urea Nitrogen (BUN)"},        
        {...patient.kidneyFunction.Creatinine,name:"Creatinine"},        
        {...patient.kidneyFunction['Estimated Glomerular Filtration Rate (eGFR)'],name:"Estimated Glomerular Filtration Rate (eGFR)"},        
        {...patient.kidneyFunction['Albumin/Creatinine Ratio - ACR'],name:"Albumin/Creatinine Ratio - ACR"},                  
      ]}
      />
  </IonRow>  
  <IonRow>
    <IonCol size='12' size-lg='4'>
    <IonCard>
          <IonCardHeader>
            <IonCardTitle>{visitType} Visit</IonCardTitle>                       
          </IonCardHeader>
          <IonCardContent>            
            <IonItem lines='full'>
              <IonIcon slot='start' icon={accessibilityOutline} className="card-icon"/>
              <IonSelect 
              interface="popover" placeholder="Start a new visit" value={visitType} onIonChange={e=>setVisitType(e.detail.value)}>
                <IonSelectOption></IonSelectOption>
                {visitTypes.map(visit=><IonSelectOption>{visit.name}</IonSelectOption>)}                                
              </IonSelect>
            </IonItem>                        
            
            {visitType&&
            <IonList >
              <IonItem lines='none'>                       
                <IonSearchbar debounce={100} onIonChange={e=>setAssessmentSearch(e.detail.value||"")}/>
              </IonItem>   
          
              <div style={{maxHeight:500,overflow:'auto'}}>
                {visitTypes.find(visit=>visit.name==visitType)
                ?.assessments
                .filter(item=>item.name.match(new RegExp(assessmentSearch,"i")))
                .map(item=>
                <IonItem button detail={true} onClick={()=>{setAssessment(item)}}>          
                  <IonLabel>{item.name}</IonLabel>                          
                </IonItem>)}
              </div>
            </IonList>              
            }                                
            
          </IonCardContent>
        </IonCard>
        </IonCol>
        
        <IonCol size='12' size-lg='8'>      
        {visit?.component!=null&&   
          <Suspense fallback={<Skeleton/>}>                
            <LazyComponent name={`../components/visit/${visit.component}`}/>
          </Suspense>                    
        }
        {visit.assessments.map(assessment=>   
          <Suspense fallback={<Skeleton/>}>                
            <LazyComponent name={`../components/visit/${assessment.component}`}/>
          </Suspense>            
        )
        }
        </IonCol>
      <IonCol size='12' size-lg='4'>
      

       
    </IonCol>
    
    
  
              

        </IonRow>
      </IonGrid>
      </IonContent>
      }
    </IonPage>
  );
};

export default PatientPage;
