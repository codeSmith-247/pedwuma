import {useState, useEffect} from 'react';
import Skeleton from 'react-loading-skeleton';
import {read} from  '../databank';

// eslint-disable-next-line react/prop-types
const SkillPicker = ({oldskills = [], skillsCallback = () => {}}) => {
    const [skills, setSkills] = useState(oldskills);

    const [selected_skills , setSelected_skills] = useState(oldskills);

    const {data, isLoading, isError} = read.useSkills();

    if(skills.length <= 0 && oldskills.length > 0) setSkills([...oldskills]);

    console.log(skills, oldskills, skills.length <= 0 && oldskills.length > 0);

    const handleSkills = (change_event) => {
        let value = change_event.target.value;

        if(skills.indexOf(value) < 0) {
            setSelected_skills([value]);
        }
        // console.log(value);
    }

    const skillsButtonTrigger = () => {
        console.log("skills", skills, "selected_skill", selected_skills[0], "check", skills.indexOf(selected_skills[0]));
        if(skills.indexOf(selected_skills[0]) < 0)
        setSkills([...skills, ...selected_skills], skillsCallback(skills));
        
    }

    const removeSkill = (skill) => {

        // console.log("skill", skill);
        // console.log("list before", selected_skills);
        
        setSelected_skills(selected_skills => selected_skills.filter(existing_skill => existing_skill !== skill));
        setSkills(skills => skills.filter(existing_skill => existing_skill !== skill), skillsCallback(skills));
        // console.log("list after", selected_skills);

    }

    const skillMap = {}

    if(data && typeof(data.data) !== 'undefined')  {
        data?.data?.map(item => {
            skillMap[item.title] = item.id;
        })
    }



  return (
    <>
        <div className="mb-5">

            <label htmlFor="title" className="mb-1 font-bold">Skills</label>

            {data && 
                <div className={`search-box bg-white border-2 border-green-400 rounded-md h-[60px] max-[835px]:w-full shadow-lg flex overflow-hidden`}>
                    <select className={`w-full h-full p-2 px-5 ring-0 border-0 hover:border-0 hover:ring-0 outline-none`} type="text" placeholder={'type your skill here'} onChange={handleSkills}>
                        <option disabled selected>Select a skill</option>
                        {data?.data?.map((item, index) => 
                            <option key={index} id={item.id} value={item.title}>{item.title}</option>
                        )}
                    </select>
                    <button onClick={skillsButtonTrigger} type="button" className={`bg-green-500 border-0 hover:border-0 text-white p-5 h-full w-[60px] transform scale-95 rounded-md flex justify-center items-center text-2xl `}>
                        <i className="bi bi-plus "></i>
                    </button>
                </div>
            }

            {(isLoading || isError) && 
                <div className={`search-box bg-white border-2 border-green-400 rounded-md h-[60px] max-[835px]:w-full shadow-lg flex overflow-hidden`}>
                    <Skeleton height={60} />
                    <Skeleton height={60} width={60} />
                </div>
            }
        </div>


        <div className="skills flex items-center flex-wrap gap-2 mb-5">
            {skills.map((skill, index) => 
                <div className="skill px-3 bg-green-400 text-white flex items-center h-[35px] font-bold text-xs rounded-md m-2" key={skill}>
                    <span className="mr-2">{skill}</span>
                    <span className="h-[25px] w-[25px] flex items-center justify-center bg-red-500 text-white rounded-full cursor-pointer" onClick={() => removeSkill(skill)}>
                        <i className="bi bi-trash text-md"></i>
                    </span>
                    <input name={`skills[${index}]`} value={skillMap[skill]} type="hidden" />
                </div>
            )}
        </div>
    </>
  )
}

export default SkillPicker