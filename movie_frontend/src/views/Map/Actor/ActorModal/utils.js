const constructPersonalDetail = (info) => {
    if ("personDetail" in info) {
        const nodes = [];
        const links = [];
        const personDetail = info["personDetail"];
        let index = 0;
        // chs_name作为根节点
        nodes.push({
            "id": "root_" + personDetail["chs_name"],
            "name": personDetail["chs_name"],
            "type": "root",
            "value": 1,
        });

        nodes.push({
            "id": "name",
            "name": "name",
            "type": "nameRoot",
            "value": 1,
        });

        links.push({
            "source": "root_" + personDetail["chs_name"],
            "target": "name",
            "label": "名称",
            "value": 1,
            "index": index++,
        });

        // chs_name作为中文简体名
        nodes.push({
            "id": "chs_name_" + personDetail["chs_name"],
            "name": personDetail["chs_name"],
            "type": "name",
            "value": 1,
        });
        links.push({
            "source": "name",
            "target": "chs_name_" + personDetail["chs_name"],
            "label": "简体中文名",
            "value": 1,
            "index": index++,
        });

        // en_name作为英文名
        if ("en_name" in personDetail && personDetail["en_name"] !== "") {
            nodes.push({
                "id": "en_name_" + personDetail["en_name"],
                "name": personDetail["en_name"],
                "type": "name",
                "value": 1,
            });
            links.push({
                "source": "name",
                "target": "en_name_" + personDetail["en_name"],
                "label": "英文名",
                "value": 1,
                "index": index++,
            });
        }

        if ("name" in personDetail && personDetail["name"] !== []) {
            const names = personDetail["name"];
            names.forEach((name) => {
                // nameType, uri, label
                nodes.push({
                    "id": "name_" + name["uri"],
                    "name": name["label"],
                    "type": "name",
                    "value": 1,
                });
                links.push({
                    "source": "name",
                    "target": "name_" + name["uri"],
                    "label": name["nameType"],
                    "value": 1,
                    "index": index++,
                });
            });
        }

        //cht_name
        if ("cht_name" in personDetail && personDetail["cht_name"] !== "") {
            nodes.push({
                "id": "cht_name_" + personDetail["cht_name"],
                "name": personDetail["cht_name"],
                "type": "name",
                "value": 1,
            });
            links.push({
                "source": "name",
                "target": "cht_name_" + personDetail["cht_name"],
                "label": "繁体中文名",
                "value": 1,
                "index": index++,
            });
        }

        // eng_name
        if ("eng_name" in personDetail && personDetail["eng_name"] !== "") {
            nodes.push({
                "id": "eng_name_" + personDetail["eng_name"],
                "name": personDetail["eng_name"],
                "type": "name",
                "value": 1,
            });
            links.push({
                "source": "name",
                "target": "eng_name_" + personDetail["eng_name"],
                "label": "英文名",
                "value": 1,
                "index": index++,
            });
        }

        // familyName
        if ("familyName" in personDetail && personDetail["familyName"] !== "") {
            nodes.push({
                "id": "familyName_" + personDetail["familyName"],
                "name": personDetail["familyName"],
                "type": "uri",
                "value": 1,
            });
            links.push({
                "source": "name",
                "target": "familyName_" + personDetail["familyName"],
                "label": "姓氏",
                "value": 1,
                "index": index++,
            });
        }

        // courtesyName
        if ("courtesyName" in personDetail && personDetail["courtesyName"] !== "" && personDetail["courtesyName"] !== []) {
            for (let courtesyName of personDetail["courtesyName"]) {
                nodes.push({
                    "id": "courtesyName_" + courtesyName,
                    "name": courtesyName,
                    "type": "name",
                    "value": 1,
                });
                links.push({
                    "source": "name",
                    "target": "courtesyName_" + courtesyName,
                    "label": "表字",
                    "value": 1,
                    "index": index++,
                });
            }
        }

        // pseudonym
        if ("pseudonym" in personDetail && personDetail["pseudonym"] !== "" && personDetail["pseudonym"] !== []) {
            for (let pseudonym of personDetail["pseudonym"]) {
                nodes.push({
                    "id": "pseudonym_" + pseudonym,
                    "name": pseudonym,
                    "type": "name",
                    "value": 1,
                });
                links.push({
                    "source": "name",
                    "target": "pseudonym_" + pseudonym,
                    "label": "笔名",
                    "value": 1,
                    "index": index++,
                });
            }
        }




        // uri
        if ("uri" in personDetail && personDetail["uri"] !== "") {
            nodes.push({
                "id": "uri_" + personDetail["uri"],
                "name": personDetail["uri"],
                "type": "uri",
                "value": 1,
            });
            links.push({
                "source": "root_" + personDetail["chs_name"],
                "target": "uri_" + personDetail["uri"],
                "label": "uri",
                "value": 1,
                "index": index++,
            });
        }

        // 基本信息
        nodes.push({
            "id": "basicInfo",
            "name": "basicInfo",
            "type": "basicInfoRoot",
            "value": 1,
        });
        links.push({
            "source": "root_" + personDetail["chs_name"],
            "target": "basicInfo",
            "label": "基本信息",
            "value": 1,
            "index": index++,
        });

        // speciality
        if ("speciality" in personDetail && personDetail["speciality"] !== "") {
            let specialityList = []
            if (personDetail["speciality"].indexOf("、") !== -1
            ) {
                specialityList = personDetail["speciality"].split("、");
            }
            else {
                specialityList = personDetail["speciality"].split(",");
            }
            for (let speciality of specialityList) {
                nodes.push({
                    "id": "speciality_" + speciality,
                    "name": speciality,
                    "type": "basicInfo",
                    "value": 1,
                });
                links.push({
                    "source": "basicInfo",
                    "target": "speciality_" + speciality,
                    "label": "职业",
                    "value": 1,
                    "index": index++,
                });

            }

        }

        // temporal
        if ("temporal" in personDetail && personDetail["temporal"] !== "") {
            nodes.push({
                "id": "temporal_" + personDetail["temporal"],
                "name": personDetail["temporal"],
                "type": "basicInfo",
                "value": 1,
            });
            links.push({
                "source": "basicInfo",
                "target": "temporal_" + personDetail["temporal"],
                "label": "时期",
                "value": 1,
                "index": index++,
            });
        }

        // nativePlace
        if ("nativePlace" in personDetail && personDetail["nativePlace"] !== "") {
            nodes.push({
                "id": "nativePlace",
                "name": personDetail["nativePlace"],
                "type": "basicInfo",
                "value": 1,
            });
            links.push({
                "source": "basicInfo",
                "target": "nativePlace",
                "label": "籍贯",
                "value": 1,
                "index": index++,
            });
        }

        // img
        if ("img" in personDetail && personDetail["img"] !== "") {
            nodes.push({
                "id": "img_" + personDetail["img"],
                "name": "",
                "type": "img",
                "imgUrl": personDetail["img"],
                "value": 1,
            });
            links.push({
                "source": "basicInfo",
                "target": "img_" + personDetail["img"],
                "label": "照片",
                "value": 1,
                "index": index++,
            });
        }

        // gender
        if ("gender" in personDetail && personDetail["gender"] !== "") {
            nodes.push({
                "id": "gender",
                "name": personDetail["gender"],
                "type": "basicInfo",
                "value": 1,
            });
            links.push({
                "source": "basicInfo",
                "target": "gender",
                "label": "性别",
                "value": 1,
                "index": index++,
            });
        }

        // ethnicity
        if ("ethnicity" in personDetail && personDetail["ethnicity"] !== "") {
            nodes.push({
                "id": "ethnicity",
                "name": personDetail["ethnicity"],
                "type": "basicInfo",
                "value": 1,
            });
            links.push({
                "source": "basicInfo",
                "target": "ethnicity",
                "label": "民族",
                "value": 1,
                "index": index++,
            });
        }

        // nationality
        if ("nationality" in personDetail && personDetail["nationality"] !== "") {
            nodes.push({
                "id": "nationality",
                "name": personDetail["nationality"],
                "type": "basicInfo",
                "value": 1,
            });
            links.push({
                "source": "basicInfo",
                "target": "nationality",
                "label": "国籍",
                "value": 1,
                "index": index++,
            });
        }


        // identifier
        if ("identifier" in personDetail && personDetail["identifier"] !== "") {
            nodes.push({
                "id": "identifier_" + personDetail["identifier"],
                "name": personDetail["identifier"],
                "type": "basicInfo",
                "value": 1,
            });
            links.push({
                "source": "basicInfo",
                "target": "identifier_" + personDetail["identifier"],
                "label": "索引号",
                "value": 1,
                "index": index++,
            });
        }

        // birthPlace
        if ("birthPlace" in personDetail && personDetail["birthPlace"] !== "") {
            nodes.push({
                "id": "birthPlace",
                "name": personDetail["birthPlace"],
                "type": "uri",
                "value": 1,
            });
            links.push({
                "source": "basicInfo",
                "target": "birthPlace",
                "label": "出生地",
                "value": 1,
                "index": index++,
            });
        }

        // briefBiography
        if ("briefBiography" in personDetail && personDetail["briefBiography"] !== "" && personDetail["briefBiography"] !== []) {
            nodes.push({
                "id": "briefBiography",
                "name": personDetail["briefBiography"][0],
                "type": "basicInfo",
                "value": 1,
            });
            links.push({
                "source": "basicInfo",
                "target": "briefBiography",
                "label": "简介",
                "value": 1,
                "index": index++,
            });
        }


        // 关系
        nodes.push({
            "id": "relation",
            "name": "关系",
            "type": "relationRoot",
            "value": 1,
        });
        links.push({
            "source": "basicInfo",
            "target": "relation",
            "label": "关系",
            "value": 1,
            "index": index++,
        });

        // friendOf
        if ("friendOf" in personDetail && personDetail["friendOf"] !== "" && personDetail["friendOf"] !== []) {

            for (let friend of personDetail["friendOf"]) {
                nodes.push({
                    "id": "friendOf_" + friend["uri"],
                    "name": friend["name"],
                    "type": "relation",
                    "value": 1,
                });
                links.push({
                    "source": "relation",
                    "target": "friendOf_" + friend["uri"],
                    "label": friend["relationType"],
                    "value": 1,
                    "index": index++,
                });
            }
        }

        // spouseOf
        if ("spouseOf" in personDetail && personDetail["spouseOf"] !== "" && personDetail["spouseOf"] !== []) {
            for (let spouse of personDetail["spouseOf"]) {
                nodes.push({
                    "id": "spouseOf_" + spouse["uri"],
                    "name": spouse["name"],
                    "type": "relation",
                    "value": 1,
                });
                links.push({
                    "source": "relation",
                    "target": "spouseOf_" + spouse["uri"],
                    "label": spouse["relationType"],
                    "value": 1,
                    "index": index++,
                });
            }
        }

        // parentOf
        if ("parentOf" in personDetail && personDetail["parentOf"] !== "" && personDetail["parentOf"] !== []) {
            for (let parent of personDetail["parentOf"]) {
                nodes.push({
                    "id": "parentOf_" + parent["uri"],
                    "name": parent["name"],
                    "type": "relation",
                    "value": 1,
                });
                links.push({
                    "source": "relation",
                    "target": "parentOf_" + parent["uri"],
                    "label": parent["relationType"],
                    "value": 1,
                    "index": index++,
                });
            }
        }
        // childOf
        if ("childOf" in personDetail && personDetail["childOf"] !== "" && personDetail["childOf"] !== []) {
            for (let child of personDetail["childOf"]) {
                nodes.push({
                    "id": "childOf_" + child["uri"],
                    "name": child["name"],
                    "type": "relation",
                    "value": 1,
                });
                links.push({
                    "source": "relation",
                    "target": "childOf_" + child["uri"],
                    "label": child["relationType"],
                    "value": 1,
                    "index": index++,
                });
            }
        }


        // relatedOrganization
        if ("relatedOrganization" in personDetail && personDetail["relatedOrganization"] !== "" && personDetail["relatedOrganization"] !== []) {
            nodes.push({
                "id": "relatedOrganization",
                "name": "relatedOrganization",
                "type": "organizationRoot",
                "value": 1,
            });
            links.push({
                "source": "basicInfo",
                "target": "relatedOrganization",
                "label": "组织",
                "value": 1,
                "index": index++,
            });
            for (let organization of personDetail["relatedOrganization"]) {
                nodes.push({
                    "id": "relatedOrganization_" + organization,
                    "name": organization,
                    "type": "organization",
                    "value": 1,
                });
                links.push({
                    "source": "relatedOrganization",
                    "target": "relatedOrganization_" + organization,
                    "label": "参与过",
                    "value": 1,
                    "index": index++,
                });
            }
        }


        // source
        if ("source" in personDetail && personDetail["source"] !== "") {
            nodes.push({
                "id": "source_" + personDetail["source"],
                "name": personDetail["source"],
                "type": "source",
                "value": 1,
            });
            links.push({
                "source": "root_" + personDetail["chs_name"],
                "target": "source_" + personDetail["source"],
                "label": "来源",
                "value": 1,
                "index": index++,
            });
        }

        // time
        nodes.push({
            "id": "time",
            "name": "time",
            "type": "timeRoot",
            "value": 1,
        });

        links.push({
            "source": "root_" + personDetail["chs_name"],
            "target": "time",
            "label": "时间",
            "value": 1,
            "index": index++,
        });

        // deathday
        if ("deathday" in personDetail && personDetail["deathday"] !== "") {
            nodes.push({
                "id": "deathday_" + personDetail["deathday"],
                "name": personDetail["deathday"],
                "type": "time",
                "value": 1,
            });
            links.push({
                "source": "time",
                "target": "deathday_" + personDetail["deathday"],
                "label": "死亡时间",
                "value": 1,
                "index": index++,
            });
        }

        // birthday
        if ("birthday" in personDetail && personDetail["birthday"] !== "") {
            nodes.push({
                "id": "birthday_" + personDetail["birthday"],
                "name": personDetail["birthday"],
                "type": "time",
                "value": 1,
            });
            links.push({
                "source": "time",
                "target": "birthday_" + personDetail["birthday"],
                "label": "出生时间",
                "value": 1,
                "index": index++,
            });
        }

        // createdWork
        if ("createdWork" in personDetail && personDetail["createdWork"] !== "" && personDetail["createdWork"] !== []) {
            nodes.push({
                "id": "createdWork",
                "name": "createdWork",
                "type": "createdWorkRoot",
                "value": 1,
            });
            links.push({
                "source": "root_" + personDetail["chs_name"],
                "target": "createdWork",
                "label": "作品",
                "value": 1,
                "index": index++,
            });
            for (let work of personDetail["createdWork"]) {
                nodes.push({
                    "id": "createdWork_" + work,
                    "name": work,
                    "type": "createdWork",
                    "value": 1,
                });
                links.push({
                    "source": "createdWork",
                    "target": "createdWork_" + work,
                    "label": "作品",
                    "value": 1,
                    "index": index++,
                });
            }
        }



        return {
            "nodes": nodes,
            "links": links,
            "rootId": "root_" + personDetail["chs_name"],
            "index": index,
        }

    }
    else {
        return {
            "nodes": [],
            "links": []
        }
    }
};

const constructPhotoOfPerson = (info, rootId, index) => {
    if ("photoOfPerson" in info && info["photoOfPerson"] !== "" && info["photoOfPerson"] !== []) {
        const nodes = [];
        const links = [];
        const photoOfPerson = info["photoOfPerson"];

        nodes.push({
            "id": "photoOfPerson",
            "name": "photoOfPerson",
            "type": "photoOfPersonRoot",
            "value": 1,
        });
        links.push({
            "source": rootId,
            "target": "photoOfPerson",
            "label": "照片",
            "value": 1,
            "index": index++,
        });

        for (let photo of photoOfPerson) {
            nodes.push({
                "id": "photoOfPerson_" + photo["photoUri"],
                "name": "",
                "type": "img",
                "imgUrl": photo["imagePath"],
                "date": photo["date"],
                "description": photo["description"],
                "photoType": photo["type"],
                "value": 1,
            });
            links.push({
                "source": "photoOfPerson",
                "target": "photoOfPerson_" + photo["photoUri"],
                "label": photo["type"],
                "value": 1,
                "index": index++,
            });
        }


        return {
            "nodes": nodes,
            "links": links,
            "index": index,
        }
    }
    else {
        return {
            "nodes": [],
            "links": [],
            "index": index,
        }
    }
}



const constructNodesAndLinks = (info) => {
    const data = {
        "nodes": [],
        "links": []
    }
    const personDetailInfo = constructPersonalDetail(info);
    const photoOfPersonInfo = constructPhotoOfPerson(info, personDetailInfo.rootId, personDetailInfo.index);
    data.nodes = data.nodes.concat(personDetailInfo.nodes);
    data.links = data.links.concat(personDetailInfo.links);
    data.nodes = data.nodes.concat(photoOfPersonInfo.nodes);
    data.links = data.links.concat(photoOfPersonInfo.links);
    return data;
};

export default constructNodesAndLinks;