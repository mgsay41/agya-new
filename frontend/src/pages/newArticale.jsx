import { CiSearch } from "react-icons/ci";
import { useEffect, useState, useContext } from "react";
import RichTextWithTranslate from "../components/richText";
import { GlobalContext } from "../context/GlobelContext";

import { FaFile } from "react-icons/fa";
import { IoTrashBinOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import Navbar from "../components/Navbar";

export default function NewArtical() {
  const { setIsAuthUser, isAuthUser } = useContext(GlobalContext);
  const [title, setTitle] = useState("bbbbbbbbb");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);    // tags not define in schema
  const [adminTags,setAdminTags] = useState([]);
  const [references, setReferences] = useState([]);
  const [image, setImages] = useState(""); // feature image not exist in the article model
  const [editorValue, setEditorValue] = useState("");
  const [newReference, setNewReference] = useState(""); // State to hold the new reference text
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    setIsAuthUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchTags();
  }, [setIsAuthUser]);

  useEffect(() => {
    handleExtractData()
  }, [editorValue]);
  const handleExtractData = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(editorValue, "text/html");
    const firstElement = Array.from(doc.body.childNodes)
      .find(node => node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim()));
    const firstLineHTML = firstElement ? firstElement.outerHTML || firstElement.textContent : "No Title";
    setTitle(firstLineHTML);
    //console.log(firstLineHTML)
    const firstImage = doc.querySelector("img")?.src || "No Image";
    setImages(firstImage);
    //console.log(firstImage);
  };
  
  

  const handleAddReference = () => {
    if (newReference.trim() !== "") {
      setReferences((prevReferences) => [...prevReferences, newReference]);
      setNewReference(""); // Clear the input field after adding
    }
  };

  const handleDeleteReference = (index) => {
    const updatedReferences = references.filter((_, i) => i !== index);
    setReferences(updatedReferences);
  };
  const handleAddTag = (tag) => {
    if (!tags.includes(tag)) {
      setTags((prevTags) => [...prevTags, tag]);
    }
  };

  const handleRemoveTag = (tag) => {
    setTags((prevTags) => prevTags.filter((t) => t !== tag));
  };

  const filteredAdminTags = adminTags.filter((tag) =>
    tag.name.toLowerCase().includes(searchText.toLowerCase())
  );

  async function createArticle() {
    try {
      const articleData = {
        title: title,
        content: editorValue,
        authorId: isAuthUser.id, // Example MongoDB ObjectId
        tags: tags,
        references: references,
        authorName: isAuthUser.firstname
      };

      const response = await fetch("http://localhost:4000/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articleData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create article");
      }

      const newArticle = await response.json();
      console.log("Article created successfully:", newArticle);
    } catch (error) {
      console.error("Error creating article:", error.message);
    }
  }
  async function fetchTags() {
    try {
      const response = await fetch("http://localhost:4000/api/tags", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to fetch tags");
      }
  
      const tags = await response.json();
      setAdminTags(tags);
      console.log("Fetched tags successfully:", tags);
      return tags;
    } catch (error) {
      console.error("Error fetching tags:", error.message);
    }
  }

  return (
    <div className="px-[150px]">
      <Navbar />
      <form className="articale">
        <div className="mt-8">
          <div>
            <RichTextWithTranslate onEditorChange={(value) => setEditorValue(value)} />
          </div>
          <h3 className="font-semibold my-5">Featured Image</h3>
          <div className="flex flex-col">
            <div>
              <input type="radio" className="accent-main w-[15px] h-[15px]" id="" name="feat-input" />
              <label htmlFor=""> Use first image as featured image</label>
            </div>
            <div>
              <input type="radio" className="accent-main w-[15px] h-[15px]" name="feat-input" />
              <label htmlFor=""> Upload another image</label>
            </div>
          </div>
          <div className="tages">
             <h3 className="font-semibold my-5">Article Tags</h3>
             <div className="flex h-[10px] items-center relative mb-[10px]">
              <CiSearch className="absolute top-[-9px] left-1 w-[25px]" />
              <input
                type="text"
                className="bg-[#e6e6d7] border-0 w-1/2 px-[40px] h-[30px] mb-[10px] rounded-[5px]"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)} // Update search text
                placeholder="Search tags"
              />
            </div>
            {/* Selected Tags */}
            <div className="flex gap-[10px]">
              {tags.map((tag) => (
                <div
                  key={tag._id}
                  className="border border-solid py-[6px] px-[10px] border-main mt-[10px] rounded-[5px] cursor-pointer bg-main text-white"
                  onClick={() => handleRemoveTag(tag)}
                >
                  {tag.name}
                </div>
              ))}
            </div>
            <div className="flex gap-[10px] mt-[10px]">
              {filteredAdminTags.map((tag) => (
                <div
                  key={tag._id}
                  className="border border-solid py-[6px] px-[10px] border-main rounded-[5px] cursor-pointer"
                  onClick={() => handleAddTag(tag)}
                >
                  {tag.name}
                </div>
              ))}
            </div>
            <div>
              <h3 className="font-semibold my-5">Article References</h3>
              <div className="flex flex-col w-full">
                <div className="w-full relative">
                  <input
                    type="text"
                    className="mb-5 h-[35px] border py-[2px] px-[5px] border-[#e6e6d7] w-full"
                    placeholder="Sources, bibliography, links, book titles"
                    value={newReference}
                    onChange={(e) => setNewReference(e.target.value)} // Handle new reference input change
                  />
                  <button
                    type="button"
                    onClick={handleAddReference} // Add reference to the list when clicked
                    className="absolute right-0 bg-main text-white w-[25px] h-[25px] rounded-[5px] top-[6px] py-[2px] px-[8px]"
                  >
                    <IoMdAdd />
                  </button>
                </div>
                {references.map((reference, index) => (
                  <div key={index} className="flex items-center gap-[5px] w-full">
                    <FaFile className="text-main" />
                    <p className="text-main w-full text-[14px] underline">{reference}</p>
                    <IoTrashBinOutline
                      onClick={() => handleDeleteReference(index)} // Delete the reference when clicked
                      className="cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="submit-articale">
              <h4 className="mt-5">By submitting this article, I certify that:</h4>
              <ol start={"1"}>
                <li>Content Accuracy: The content is based on credible evidence and research.</li>
                <li>Asset Ownership: I own the copyright to all uploaded assets or have obtained necessary permissions.</li>
                <li>Consent to Use: I grant [Platform Name] a non-exclusive, worldwide, royalty-free license to reproduce, distribute, display, and perform the uploaded assets.</li>
              </ol>
              <div className="flex gap-[5px]">
                <input type="checkbox" className="accent-main w-[15px]" />
                <p className="text-[13px]">
                  I understand that providing false or misleading information or unauthorized assets may result in the removal of my article and potential consequences.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button
            className="bg-main text-white py-[12px] px-[100px] rounded-[5px] my-8"
            onClick={()=>createArticle()}
          >
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}
