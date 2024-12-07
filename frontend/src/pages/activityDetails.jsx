function ActivityDetails() {
  return (
    <div>
      <div>
        <div>
          <span className=" pb-1 text-[#777]  border-b border-[#777]">
            Activities
          </span>{" "}
          <span className=" text-[#777]"> /</span>{" "}
          <span className=" pb-1 text-[#777]  border-b border-[#777]">
            Patterns in History, The Annual Conference 2025
          </span>
        </div>
        <h3 className=" text-3xl font-bold text-center my-8">
          Patterns in History, The Annual Conference 2025
        </h3>
        <div className=" flex justify-between gap-16 ">
          <div>
            <img src="/activityDetails.png" className=" max-w-[500px]" alt="" />
            <div>
              <h3 className=" font-bold mb-6 mt-4">Activity Details</h3>
              <p className="text-[#010200]/70 mb-2">Mon, Dec 2 | 8:00 AM</p>
              <p className="text-[#010200]/70 mb-2">
                The Getty Conservation Institute
              </p>
              <p className=" flex items-center text-[#010200]/70 mb-2">
                <img src="/tabler_world.png" className="mr-2" alt="" />
                (Los Angeles, USA)
              </p>
              <p className=" flex items-center text-[#010200]/70 mb-2">
                <img
                  src="/icon-park-outline_ticket.png"
                  className="mr-2"
                  alt=""
                />
                Free
              </p>
              <p className=" flex items-center text-[#010200]/70 mb-2">
                <img src="/clarity_user-line.png" className="mr-2" alt="" />
                30 Applied
              </p>
            </div>
          </div>
          <div className = "">
            <h3 className=" font-bold">About</h3>
            <p className=" text-sm">
              Join us from Thursday, April 3 to Saturday, April 5, 2025, for
              three days of animated discussions, engaging workshops, and
              networking opportunities. This in-person event will bring together
              history educators and other professionals from all over to explore
              the various patterns that have shaped our world. We are proud to
              have returning events from our Historiana Teaching & Learning
              Team, as well as to announce plenary workshops from the SENSEI
              Project and Project Zero affiliates. Our opening keynote speech is
              confirmed to be delivered by Sam Wineburg! You can also expect our
              regular offer of workshops and cultural activities. Through this
              year’s conference theme, “Patterns in History?”, we explore
              whether historical patterns exist, their forms, meanings, and
              implications, and how we can learn from them. We have three
              sub-themes: Digital Education, Playful Education, and Non-Formal
              Methods. Whether you’re new to our events or a returning visitor,
              this conference is the perfect place to join a community dedicated
              to learning and sharing with like-minded individuals in the field.
              If you have any queries or require further information, please
              contact Ivan at euroclio [dot] eu.
            </p>
            <h3 className=" font-bold my-4 ">Timeline and Activities</h3>
            <p className=" text-sm">
              Find the preliminary program for the conference at
              https://euroclio.eu/wp-content/uploads/
              Patterns_in_History_Preliminary_Programme_v2024.10.03.A.pdf
              . Please
              mind that we are still in the stages of developing the details, so
              what you see here are indicators that are subject to change. We
              will announce the finalized agenda via our social channels in
              2025.
            </p>
            <h3 className=" my-4 font-bold">
            Sponsors and Exhibitors
            </h3>
            <div className=" flex gap-4 my-4">
              <img src="/Sponsors2.png" alt="" className=" w-16" />
              <img src="/Sponsor1.png" alt=""  className=" w-16"/>
            </div>
          </div>
        </div>
          <div className=" flex justify-center items-center">
            <button className=" bg-main py-3 px-36 text-white rounded-xl  ">
              Apply
            </button>
          </div>
      </div>
    </div>
  );
}

export default ActivityDetails;
