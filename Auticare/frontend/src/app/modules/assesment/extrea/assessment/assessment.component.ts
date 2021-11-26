import { Component, OnInit } from "@angular/core";
import * as Survey from "survey-angular";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../../auth/_services/auth.service";
import { AssessmentService } from "../../assessment.service";
import { User } from 'src/app/core/models/auth.models';
Survey.StylesManager.applyTheme("darkblue");
Survey.JsonObject.metaData.addProperty("question", { name: "score:number" });

var myCss = {
  matrix: {
    root: "table table-striped",
  },
  navigationButton: "button btn-lg",
};
Survey.JsonObject.metaData.addProperty("itemvalue", { name: "score:number" });

@Component({
  selector: "app-assessment",
  templateUrl: "./assessment.component.html",
  styleUrls: ["./assessment.component.scss"],
})
export class AssessmentComponent implements OnInit {
  patientName: string;
  age: Number;
  userId: string;
  users:User[];
  jsonToBind = {
    completeText: "Finish",
    pageNextText: "Continue",
    pagePrevText: "Previous",

    pages: [
      {
        elements: [
          {
            type: "panel",
            elements: [
              {
                type: "html",
                name: "income_intro",
                html: `<div class="card d-flex justify-content-center">
                <div class="col-sm-12 col-sm-6 col-md-4 ">
                  <div class="text-center">
                    <div class="card-body">
                      <img
                                  
                      src="../../../../assets/images/92395-play-human-photography-teamwork-behavior-child.png"
                      width="180" height="250"
                      class="rounded mx-auto d-block"
                      alt="..."
                    />
                    
                    </div>
                  </div>
                </div>
              </div>`,
              },
            ],
            name: "panel1",

            title: "SOCIAL RELATIONSHIP AND RECIPROCITY",
          },
        ],
        name: "page0",
      },
      {
        name: "page1",
        elements: [
          {
            type: "radiogroup",

            name: "myradiogroup1",
             isRequired: true,
            title: "Has poor eye contact",
            colCount: 1,
            choices: [
              {
                value: "Rarely",
                score: 1,
              },
              {
                value: "Sometimes",
                score: 2,
              },
              {
                value: "Frequently",
                score: 3,
              },
              {
                value: "Mostly",
                score: 4,
              },
              {
                value: "Always",
                score: 5,
              },
            ],
          },
        ],
      },
      {
        name: "page1",
        elements: [
          {
            type: "radiogroup",
            name: "myradiogroup2",
             isRequired: true,
            title: "Lacks social smile",
            colCount: 1,
            choices: [
              {
                value: "Rarely",
                score: 1,
              },
              {
                value: "Sometimes",
                score: 2,
              },
              {
                value: "Frequently",
                score: 3,
              },
              {
                value: "Mostly",
                score: 4,
              },
              {
                value: "Always",
                score: 5,
              },
            ],
          },
        ],
      },
      {
        name: "page1",
        elements: [
          {
            type: "radiogroup",
            name: "myradiogroup3",
             isRequired: true,
            title: "Remains aloof",
            colCount: 1,
            choices: [
              {
                value: "Rarely",
                score: 1,
              },
              {
                value: "Sometimes",
                score: 2,
              },
              {
                value: "Frequently",
                score: 3,
              },
              {
                value: "Mostly",
                score: 4,
              },
              {
                value: "Always",
                score: 5,
              },
            ],
          },
        ],
      },
      {
        name: "page1",
        elements: [
          {
            type: "radiogroup",
            name: "myradiogroup4",
             isRequired: true,
            title: "Does not reach out to others",
            colCount: 1,
            choices: [
              {
                value: "Rarely",
                score: 1,
              },
              {
                value: "Sometimes",
                score: 2,
              },
              {
                value: "Frequently",
                score: 3,
              },
              {
                value: "Mostly",
                score: 4,
              },
              {
                value: "Always",
                score: 5,
              },
            ],
          },
        ],
      },
      {
        name: "page1",
        elements: [
          {
            type: "radiogroup",
            name: "myradiogroup5",
             isRequired: true,
            title: "Unable to relate to people",
            colCount: 1,
            choices: [
              {
                value: "Rarely",
                score: 1,
              },
              {
                value: "Sometimes",
                score: 2,
              },
              {
                value: "Frequently",
                score: 3,
              },
              {
                value: "Mostly",
                score: 4,
              },
              {
                value: "Always",
                score: 5,
              },
            ],
          },
        ],
      },
      {
        name: "page1",
        elements: [
          {
            type: "radiogroup",
            name: "myradiogroup6",
             isRequired: true,
            title: "Unable to respond to social/ environmental cues",
            colCount: 1,
            choices: [
              {
                value: "Rarely",
                score: 1,
              },
              {
                value: "Sometimes",
                score: 2,
              },
              {
                value: "Frequently",
                score: 3,
              },
              {
                value: "Mostly",
                score: 4,
              },
              {
                value: "Always",
                score: 5,
              },
            ],
          },
        ],
      },
      {
        name: "page1",
        elements: [
          {
            type: "radiogroup",
            name: "myradiogroup7",
             isRequired: true,
            title: "Engages in solitary and repetitive play activities",
            colCount: 1,
            choices: [
              {
                value: "Rarely",
                score: 1,
              },
              {
                value: "Sometimes",
                score: 2,
              },
              {
                value: "Frequently",
                score: 3,
              },
              {
                value: "Mostly",
                score: 4,
              },
              {
                value: "Always",
                score: 5,
              },
            ],
          },
        ],
      },
      {
        name: "page1",
        elements: [
          {
            type: "radiogroup",
            name: "myradiogroup8",
             isRequired: true,
            title: "Unable to take turns in social interaction",
            colCount: 1,
            choices: [
              {
                value: "Rarely",
                score: 1,
              },
              {
                value: "Sometimes",
                score: 2,
              },
              {
                value: "Frequently",
                score: 3,
              },
              {
                value: "Mostly",
                score: 4,
              },
              {
                value: "Always",
                score: 5,
              },
            ],
          },
        ],
      },
      {
        name: "page1",
        elements: [
          {
            type: "radiogroup",
            name: "myradiogroup9",
             isRequired: true,
            title: "Does not maintain peer relationships",
            colCount: 1,
            choices: [
              {
                value: "Rarely",
                score: 1,
              },
              {
                value: "Sometimes",
                score: 2,
              },
              {
                value: "Frequently",
                score: 3,
              },
              {
                value: "Mostly",
                score: 4,
              },
              {
                value: "Always",
                score: 5,
              },
            ],
          },
        ],
      },
      {
        elements: [
          {
            type: "panel",
            elements: [
              {
                type: "html",
                name: "income_intro",
                html: `<div class="card d-flex justify-content-center">
                <div class="col-sm-12 col-sm-6 col-md-4 ">
                  <div class="text-center">
                    <div class="card-body">
                      <img
                                  
                      src="../../../../assets/images/baby-crying-icon.png"
                      width="180" height="250"
                      class="rounded mx-auto d-block"
                      alt="..."
                    />
                    
                    </div>
                  </div>
                </div>
              </div>`,
              },
            ],
            name: "panel2",

            title: "EMOTIONAL RESPONSIVENESS",
          },
        ],
        name: "page2",
      },
      {
        name: "page2",
        elements: [
          {
            type: "radiogroup",
            name: "myradiogroup10",
             isRequired: true,
            title: "Shows inappropriate emotional response",
            colCount: 1,
            choices: [
              {
                value: "Rarely",
                score: 1,
              },
              {
                value: "Sometimes",
                score: 2,
              },
              {
                value: "Frequently",
                score: 3,
              },
              {
                value: "Mostly",
                score: 4,
              },
              {
                value: "Always",
                score: 5,
              },
            ],
          },
        ],
      },
      {
        name: "page2",
        elements: [
          {
            type: "radiogroup",
            name: "myradiogroup11",
             isRequired: true,
            title: "Shows exaggerated emotions",
            colCount: 1,
            choices: [
              {
                value: "Rarely",
                score: 1,
              },
              {
                value: "Sometimes",
                score: 2,
              },
              {
                value: "Frequently",
                score: 3,
              },
              {
                value: "Mostly",
                score: 4,
              },
              {
                value: "Always",
                score: 5,
              },
            ],
          },
        ],
      },
      {
        name: "page2",
        elements: [
          {
            type: "radiogroup",
            name: "myradiogroup12",
             isRequired: true,
            title: "Engages in self-stimulating emotions",
            colCount: 1,
            choices: [
              {
                value: "Rarely",
                score: 1,
              },
              {
                value: "Sometimes",
                score: 2,
              },
              {
                value: "Frequently",
                score: 3,
              },
              {
                value: "Mostly",
                score: 4,
              },
              {
                value: "Always",
                score: 5,
              },
            ],
          },
        ],
      },
      {
        name: "page2",
        elements: [
          {
            type: "radiogroup",
            name: "myradiogroup13",
             isRequired: true,
            title: "Lacks fear of danger",
            colCount: 1,
            choices: [
              {
                value: "Rarely",
                score: 1,
              },
              {
                value: "Sometimes",
                score: 2,
              },
              {
                value: "Frequently",
                score: 3,
              },
              {
                value: "Mostly",
                score: 4,
              },
              {
                value: "Always",
                score: 5,
              },
            ],
          },
        ],
      },
      {
        name: "page2",
        elements: [
          {
            type: "radiogroup",
            name: "myradiogroup14",
             isRequired: true,
            title: "Excited or agitated for no apparent reason",
            colCount: 1,
            choices: [
              {
                value: "Rarely",
                score: 1,
              },
              {
                value: "Sometimes",
                score: 2,
              },
              {
                value: "Frequently",
                score: 3,
              },
              {
                value: "Mostly",
                score: 4,
              },
              {
                value: "Always",
                score: 5,
              },
            ],
          },
        ],
      },
      {
        elements: [
          {
            type: "panel",
            elements: [
              {
                type: "html",
                name: "income_intro",
                html: `<div class="card d-flex justify-content-center">
          <div class="col-sm-12 col-sm-6 col-md-4 ">
            <div class="text-center">
              <div class="card-body">
                <img
                            
                src="../../../../assets/images/image3.png"
                width="180" height="250"
                class="rounded mx-auto d-block"
                alt="..."
              />
              
              </div>
            </div>
          </div>
        </div>`,
              },
            ],
            name: "panel6",

            title: "SPEECH-LANGUAGE AND COMMUNICATION",
          },
        ],
        name: "page3",
      },
      {
        name: "page3",
        elements: [
          {
            type: "radiogroup",

            name: "myradiogroup15",
             isRequired: true,
            title: "Acquired speech and lost it",
            colCount: 1,
            choices: [
              {
                value: "Rarely",
                score: 1,
              },
              {
                value: "Sometimes",
                score: 2,
              },
              {
                value: "Frequently",
                score: 3,
              },
              {
                value: "Mostly",
                score: 4,
              },
              {
                value: "Always",
                score: 5,
              },
            ],
          },
        ],
      },
      {
        name: "page3",
        elements: [
          {
            type: "radiogroup",
            name: "myradiogroup16",
             isRequired: true,
            title:
              "Has difficulty in using non-verbal language or gestures to communicate",
            colCount: 1,
            choices: [
              {
                value: "Rarely",
                score: 1,
              },
              {
                value: "Sometimes",
                score: 2,
              },
              {
                value: "Frequently",
                score: 3,
              },
              {
                value: "Mostly",
                score: 4,
              },
              {
                value: "Always",
                score: 5,
              },
            ],
          },
        ],
      },
      {
        name: "page3",
        elements: [
          {
            type: "radiogroup",

            name: "myradiogroup17",
             isRequired: true,
            title: "Engages in stereotyped and repetitive use of language",
            colCount: 1,
            choices: [
              {
                value: "Rarely",
                score: 1,
              },
              {
                value: "Sometimes",
                score: 2,
              },
              {
                value: "Frequently",
                score: 3,
              },
              {
                value: "Mostly",
                score: 4,
              },
              {
                value: "Always",
                score: 5,
              },
            ],
          },
        ],
      },
      {
        name: "page3",
        elements: [
          {
            type: "radiogroup",
            name: "myradiogroup18",
             isRequired: true,
            title: "Engages in echolalic speech",
            colCount: 1,
            choices: [
              {
                value: "Rarely",
                score: 1,
              },
              {
                value: "Sometimes",
                score: 2,
              },
              {
                value: "Frequently",
                score: 3,
              },
              {
                value: "Mostly",
                score: 4,
              },
              {
                value: "Always",
                score: 5,
              },
            ],
          },
        ],
      },
      {
        name: "page3",
        elements: [
          {
            type: "radiogroup",
            name: "myradiogroup19",
             isRequired: true,
            title: "Produces infantile squeals/ unusual noises",
            colCount: 1,
            choices: [
              {
                value: "Rarely",
                score: 1,
              },
              {
                value: "Sometimes",
                score: 2,
              },
              {
                value: "Frequently",
                score: 3,
              },
              {
                value: "Mostly",
                score: 4,
              },
              {
                value: "Always",
                score: 5,
              },
            ],
          },
        ],
      },
      {
        name: "page3",
        elements: [
          {
            type: "radiogroup",
            name: "myradiogroup20",
             isRequired: true,
            title: "Unable to initiate or sustain conversation with others",
            colCount: 1,
            choices: [
              {
                value: "Rarely",
                score: 1,
              },
              {
                value: "Sometimes",
                score: 2,
              },
              {
                value: "Frequently",
                score: 3,
              },
              {
                value: "Mostly",
                score: 4,
              },
              {
                value: "Always",
                score: 5,
              },
            ],
          },
        ],
      },
      {
        name: "page3",
        elements: [
          {
            type: "radiogroup",
            name: "myradiogroup21",
             isRequired: true,
            title: "Uses jargon or meaningless words",
            colCount: 1,
            choices: [
              {
                value: "Rarely",
                score: 1,
              },
              {
                value: "Sometimes",
                score: 2,
              },
              {
                value: "Frequently",
                score: 3,
              },
              {
                value: "Mostly",
                score: 4,
              },
              {
                value: "Always",
                score: 5,
              },
            ],
          },
        ],
      },
      {
        name: "page3",
        elements: [
          {
            type: "radiogroup",
            name: "myradiogroup22",
             isRequired: true,
            title: "Uses pronoun reversals",
            colCount: 1,
            choices: [
              {
                value: "Rarely",
                score: 1,
              },
              {
                value: "Sometimes",
                score: 2,
              },
              {
                value: "Frequently",
                score: 3,
              },
              {
                value: "Mostly",
                score: 4,
              },
              {
                value: "Always",
                score: 5,
              },
            ],
          },
        ],
      },
      {
        name: "page3",
        elements: [
          {
            type: "radiogroup",
            name: "myradiogroup23",
             isRequired: true,
            title: "Unable to grasp pragmatics of communication(real meaning)",
            colCount: 1,
            choices: [
              {
                value: "Rarely",
                score: 1,
              },
              {
                value: "Sometimes",
                score: 2,
              },
              {
                value: "Frequently",
                score: 3,
              },
              {
                value: "Mostly",
                score: 4,
              },
              {
                value: "Always",
                score: 5,
              },
            ],
          },
        ],
      },
      {
        elements: [
          {
            type: "panel",
            elements: [
              {
                type: "html",
                name: "income_intro",
                html: `<div class="card d-flex justify-content-center">
              <div class="col-sm-12 col-sm-6 col-md-4 ">
                <div class="text-center">
                  <div class="card-body">
                    <img
                                
                    src="../../../../assets/images/behivour.png"
                    width="180" height="250"
                    class="rounded mx-auto d-block"
                    alt="..."
                  />
                  
                  </div>
                </div>
              </div>
            </div>`,
              },
            ],
            name: "panel4",

            title: "BEHAVIOUR PATTERNS",
          },
        ],
        name: "page4",
      },
      {
        name: "page4",
        elements: [
          {
            type: "radiogroup",

            name: "myradiogroup24",
             isRequired: true,
            title: "Engages in stereotyped and repetitive motor mannerisms",
            colCount: 1,
            choices: [
              {
                value: "Rarely",
                score: 1,
              },
              {
                value: "Sometimes",
                score: 2,
              },
              {
                value: "Frequently",
                score: 3,
              },
              {
                value: "Mostly",
                score: 4,
              },
              {
                value: "Always",
                score: 5,
              },
            ],
          },
        ],
      },
      {
        name: "page4",
        elements: [
          {
            type: "radiogroup",
            name: "myradiogroup25",
             isRequired: true,
            title: "Shows attachment to inanimate objects",
            colCount: 1,
            choices: [
              {
                value: "Rarely",
                score: 1,
              },
              {
                value: "Sometimes",
                score: 2,
              },
              {
                value: "Frequently",
                score: 3,
              },
              {
                value: "Mostly",
                score: 4,
              },
              {
                value: "Always",
                score: 5,
              },
            ],
          },
        ],
      },
      {
        name: "page4",
        elements: [
          {
            type: "radiogroup",

            name: "myradiogroup26",
             isRequired: true,
            title: "Shows hyperactivity/ restlessness",
            colCount: 1,
            choices: [
              {
                value: "Rarely",
                score: 1,
              },
              {
                value: "Sometimes",
                score: 2,
              },
              {
                value: "Frequently",
                score: 3,
              },
              {
                value: "Mostly",
                score: 4,
              },
              {
                value: "Always",
                score: 5,
              },
            ],
          },
        ],
      },
      {
        name: "page4",
        elements: [
          {
            type: "radiogroup",
            name: "myradiogroup27",
             isRequired: true,
            title: "Exhibits aggressive behavior",
            colCount: 1,
            choices: [
              {
                value: "Rarely",
                score: 1,
              },
              {
                value: "Sometimes",
                score: 2,
              },
              {
                value: "Frequently",
                score: 3,
              },
              {
                value: "Mostly",
                score: 4,
              },
              {
                value: "Always",
                score: 5,
              },
            ],
          },
        ],
      },
      {
        name: "page4",
        elements: [
          {
            type: "radiogroup",
            name: "myradiogroup28",
             isRequired: true,
            title: "Throws temper tantrums",
            colCount: 1,
            choices: [
              {
                value: "Rarely",
                score: 1,
              },
              {
                value: "Sometimes",
                score: 2,
              },
              {
                value: "Frequently",
                score: 3,
              },
              {
                value: "Mostly",
                score: 4,
              },
              {
                value: "Always",
                score: 5,
              },
            ],
          },
        ],
      },
      {
        name: "page4",
        elements: [
          {
            type: "radiogroup",
            name: "myradiogroup29",
             isRequired: true,
            title: "Engages in self-injurious behavior",
            colCount: 1,
            choices: [
              {
                value: "Rarely",
                score: 1,
              },
              {
                value: "Sometimes",
                score: 2,
              },
              {
                value: "Frequently",
                score: 3,
              },
              {
                value: "Mostly",
                score: 4,
              },
              {
                value: "Always",
                score: 5,
              },
            ],
          },
        ],
      },
      {
        name: "page4",
        elements: [
          {
            type: "radiogroup",
            name: "myradiogroup30",
             isRequired: true,
            title: "Insists on sameness",
            colCount: 1,
            choices: [
              {
                value: "Rarely",
                score: 1,
              },
              {
                value: "Sometimes",
                score: 2,
              },
              {
                value: "Frequently",
                score: 3,
              },
              {
                value: "Mostly",
                score: 4,
              },
              {
                value: "Always",
                score: 5,
              },
            ],
          },
        ],
      },
      {
        elements: [
          {
            type: "panel",
            elements: [
              {
                type: "html",
                name: "income_intro",
                html: `<div class="card d-flex justify-content-center">
                  <div class="col-sm-12 col-sm-6 col-md-4 ">
                    <div class="text-center">
                      <div class="card-body">
                        <img
                                    
                        src="../../../../assets/images/sense.png"
                        width="180" height="250"
                        class="rounded mx-auto d-block"
                        alt="..."
                      />
                      
                      </div>
                    </div>
                  </div>
                </div>`,
              },
            ],
            name: "panel5",

            title: "SENSORY ASPECTS",
          },
        ],
        name: "page5",
      },
      {
        name: "page5",
        elements: [
          {
            type: "radiogroup",

            name: "myradiogroup31",
             isRequired: true,
            title: "Unusually sensitive to sensory stimuli",
            colCount: 1,
            choices: [
              {
                value: "Rarely",
                score: 1,
              },
              {
                value: "Sometimes",
                score: 2,
              },
              {
                value: "Frequently",
                score: 3,
              },
              {
                value: "Mostly",
                score: 4,
              },
              {
                value: "Always",
                score: 5,
              },
            ],
          },
        ],
      },
      {
        name: "page5",
        elements: [
          {
            type: "radiogroup",
            name: "myradiogroup32",
             isRequired: true,
            title: "Stares into space for long periods of time",
            colCount: 1,
            choices: [
              {
                value: "Rarely",
                score: 1,
              },
              {
                value: "Sometimes",
                score: 2,
              },
              {
                value: "Frequently",
                score: 3,
              },
              {
                value: "Mostly",
                score: 4,
              },
              {
                value: "Always",
                score: 5,
              },
            ],
          },
        ],
      },
      {
        name: "page5",
        elements: [
          {
            type: "radiogroup",

            name: "myradiogroup33",
             isRequired: true,
            title: "Has difficulty in tracking objects",
            colCount: 1,
            choices: [
              {
                value: "Rarely",
                score: 1,
              },
              {
                value: "Sometimes",
                score: 2,
              },
              {
                value: "Frequently",
                score: 3,
              },
              {
                value: "Mostly",
                score: 4,
              },
              {
                value: "Always",
                score: 5,
              },
            ],
          },
        ],
      },
      {
        name: "page5",
        elements: [
          {
            type: "radiogroup",
            name: "myradiogroup34",
             isRequired: true,
            title: "Has unusual vision",
            colCount: 1,
            choices: [
              {
                value: "Rarely",
                score: 1,
              },
              {
                value: "Sometimes",
                score: 2,
              },
              {
                value: "Frequently",
                score: 3,
              },
              {
                value: "Mostly",
                score: 4,
              },
              {
                value: "Always",
                score: 5,
              },
            ],
          },
        ],
      },
      {
        name: "page5",
        elements: [
          {
            type: "radiogroup",
            name: "myradiogroup35",
             isRequired: true,
            title: "Insensitive to pain",
            colCount: 1,
            choices: [
              {
                value: "Rarely",
                score: 1,
              },
              {
                value: "Sometimes",
                score: 2,
              },
              {
                value: "Frequently",
                score: 3,
              },
              {
                value: "Mostly",
                score: 4,
              },
              {
                value: "Always",
                score: 5,
              },
            ],
          },
        ],
      },
      {
        name: "page5",
        elements: [
          {
            type: "radiogroup",
            name: "myradiogroup36",
             isRequired: true,
            title:
              "Responds to objects/people unusually by smelling, touching or tasting",
            colCount: 1,
            choices: [
              {
                value: "Rarely",
                score: 1,
              },
              {
                value: "Sometimes",
                score: 2,
              },
              {
                value: "Frequently",
                score: 3,
              },
              {
                value: "Mostly",
                score: 4,
              },
              {
                value: "Always",
                score: 5,
              },
            ],
          },
        ],
      },
      {
        elements: [
          {
            type: "panel",
            elements: [
              {
                type: "html",
                name: "income_intro",
                html: `<div class="card d-flex justify-content-center">
                    <div class="col-sm-12 col-sm-6 col-md-4 ">
                      <div class="text-center">
                        <div class="card-body">
                          <img
                                      
                          src="../../../../assets/images/skill.png"
                          width="180" height="250"
                          class="rounded mx-auto d-block"
                          alt="..."
                        />
                        
                        </div>
                      </div>
                    </div>
                  </div>`,
              },
            ],
            name: "panel5",

            title: "COGNITIVE COMPONENT",
          },
        ],
        name: "page6",
      },
      {
        name: "page6",
        elements: [
          {
            type: "radiogroup",

            name: "myradiogroup37",
             isRequired: true,
            title: "Inconsistent attention and concentration",
            colCount: 1,
            choices: [
              {
                value: "Rarely",
                score: 1,
              },
              {
                value: "Sometimes",
                score: 2,
              },
              {
                value: "Frequently",
                score: 3,
              },
              {
                value: "Mostly",
                score: 4,
              },
              {
                value: "Always",
                score: 5,
              },
            ],
          },
        ],
      },
      {
        name: "page6",
        elements: [
          {
            type: "radiogroup",
            name: "myradiogroup38",
             isRequired: true,
            title: "Shows delay in responding ",
            colCount: 1,
            choices: [
              {
                value: "Rarely",
                score: 1,
              },
              {
                value: "Sometimes",
                score: 2,
              },
              {
                value: "Frequently",
                score: 3,
              },
              {
                value: "Mostly",
                score: 4,
              },
              {
                value: "Always",
                score: 5,
              },
            ],
          },
        ],
      },
      {
        name: "page6",
        elements: [
          {
            type: "radiogroup",

            name: "myradiogroup39",
             isRequired: true,
            title: "Has unusual memory of some kind",
            colCount: 1,
            choices: [
              {
                value: "Rarely",
                score: 1,
              },
              {
                value: "Sometimes",
                score: 2,
              },
              {
                value: "Frequently",
                score: 3,
              },
              {
                value: "Mostly",
                score: 4,
              },
              {
                value: "Always",
                score: 5,
              },
            ],
          },
        ],
      },
      {
        name: "page6",
        elements: [
          {
            type: "radiogroup",
            name: "myradiogroup40",
            isRequired: true,
            title: "Has ‘savant’ ability",
            colCount: 1,
            choices: [
              {
                value: "Rarely",
                score: 1,
              },
              {
                value: "Sometimes",
                score: 2,
              },
              {
                value: "Frequently",
                score: 3,
              },
              {
                value: "Mostly",
                score: 4,
              },
              {
                value: "Always",
                score: 5,
              },
            ],
          },
        ],
      },
    ],
    completedHtml: "<h4>Your Assessment report begin processing.....please wait</h4>",
  };
  surveyResultDisplay: boolean = false;
  constructor(
    public route: Router,
    private assessment: AssessmentService,
    private auth: AuthService
  ) {
    
  }

  ngOnInit(): void {
    this.auth.getUsers().subscribe(res=>{
      this.patientName = res[0].patientName
      this.age = res[0].age
      this.userId = res[0].userId
      console.log(res[0])
      
    })
    this.surveyBindCode();
  }

  surveyBindCode() {
    const survey = new Survey.Model(this.jsonToBind);
    Survey.SurveyNG.render("surveyElement", { model: survey, css: myCss });

    survey.onComplete.add(async (result) => {
      var sum = 0;
      var data = result.data;
      this.surveyResultDisplay = result ? true : false;
      Object.keys(data).forEach(function (qName) {
        var question = survey.getQuestionByName(qName);
        var qValue = data[qName];

        if (question.choices) {
          question.choices.forEach(function (choice) {
            if (choice.value === qValue) {
              sum += +choice.score;
            }
          });
        } else {
          sum += +question.score;
        }
      });
      var element = document.querySelector("#surveyResult");
      if (element) {
        element.textContent = "Result JSON:\n" + JSON.stringify(data, null, 3);
        
       
      }
      

      this.assessment.score(sum)
      console.log(JSON.stringify(sum));
      this.ScoreApi(this.patientName,this.age,this.userId)
      setTimeout(() => {
        this.route.navigate(['assessments/result'])
      },2100);
      
    });
    
     
  }
  ScoreApi(patientName:string,age:Number,userId:string){
    
    this.assessment.scoreApi(patientName,age,userId).subscribe((res)=>{
      
    })
   
   }
}
