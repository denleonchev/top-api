export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}

export class TopPageModel {
  firstCategory: TopLevelCategory;
  secondCategory: string;
  title: string;
  productCategory: string;
  jobsAggerator?: {
    count: number;
    juniorSalary: number;
    middleSalary: number;
    seniorSalary: number;
  };
  advantages: {
    title: string;
    description: string;
  }[];
  seoText: string;
  tags: string[];
  tagsTitle: string;
}
