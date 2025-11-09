type Transcript = {
      id: number;
      title: string;
      date: string;
      time: string;
      duration: string;
      text: string;
      summary: string;
      wordCount: number;
    };

 const transcriptsData = [
   {
     id: 1,
     title: "Team Meeting - Q4 Planning",
     date: "May 12, 2025",
     time: "2:30 PM",
     duration: "45 minutes",
     text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
 
 Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
 
 Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.`,
     summary: `This is a comprehensive discussion about Q4 planning for the team. Key points include:
 
 • Setting quarterly objectives and key results (OKRs)
 • Resource allocation and budget planning
 • Timeline for major initiatives
 • Risk assessment and mitigation strategies
 • Team capacity and workload distribution
 
 The meeting concluded with clear action items and deadlines for all team members.`,
     wordCount: 245,
   },
   {
     id: 2,
     title: "Product Research Analysis",
     date: "May 10, 2025",
     time: "10:00 AM",
     duration: "60 minutes",
     text: `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
 
 Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.
 
 Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.`,
     summary: `Product research findings highlight customer needs and market opportunities:
 
 • Strong demand for automated features
 • Users prefer intuitive interfaces
 • Mobile-first approach is critical
 • Integration with existing tools is essential
 • Pricing sensitivity varies by market segment
 
 Recommendations include prioritizing user experience improvements and expanding mobile capabilities.`,
     wordCount: 312,
   },
   {
     id: 3,
     title: "Customer Interview Insights",
     date: "May 8, 2025",
     time: "3:15 PM",
     duration: "30 minutes",
     text: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
 
 Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.`,
     summary: `Customer feedback reveals key insights about product usage:
 
 • Primary use case is workflow automation
 • Users struggle with initial setup
 • Support documentation needs improvement
 • Feature requests focus on collaboration tools
 • High satisfaction with core functionality
 
 Action items include improving onboarding and expanding help resources.`,
     wordCount: 189,
   },
   {
     id: 4,
     title: "Market Trends Report",
     date: "May 5, 2025",
     time: "11:30 AM",
     duration: "50 minutes",
     text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
 
 Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.
 
 Omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.`,
     summary: `Market analysis indicates emerging trends and opportunities:
 
 • AI adoption accelerating across industries
 • Remote work driving software demand
 • Security and privacy becoming top priorities
 • Subscription models preferred over perpetual licenses
 • Integration capabilities are differentiators
 
 Strategic recommendations include investing in AI features and strengthening security posture.`,
     wordCount: 428,
   },
   {
     id: 5,
     title: "Training Session Notes",
     date: "May 3, 2025",
     time: "9:00 AM",
     duration: "90 minutes",
     text: `Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt.
 
 Ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.
 
 Vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.`,
     summary: `Training session covered essential topics and best practices:
 
 • Introduction to platform features
 • Step-by-step workflow demonstrations
 • Common troubleshooting scenarios
 • Advanced tips and shortcuts
 • Q&A addressing participant questions
 
 Attendees gained practical skills and confidence in using the platform effectively.`,
     wordCount: 267,
   },
   {
     id: 6,
     title: "Project Retrospective",
     date: "May 1, 2025",
     time: "4:00 PM",
     duration: "40 minutes",
     text: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
 
 Sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
 
 Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?`,
     summary: `Project retrospective identified successes and areas for improvement:
 
 • Successfully delivered all major features on time
 • Strong collaboration between teams
 • Communication gaps caused minor delays
 • Technical debt needs addressing
 • Documentation requires updates
 
 Next steps include implementing lessons learned and planning process improvements.`,
     wordCount: 298,
   },
 ];
 
export default transcriptsData;