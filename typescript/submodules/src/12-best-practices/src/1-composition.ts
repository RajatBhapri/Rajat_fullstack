// old way

class UserOld {
  constructor(public id: string, public name: string) {}
}

class PremiumUserOld extends UserOld {
  discount() {
    return 0.2;
  }
}

// better way (composition)

interface PricingPolicy {
  discount(): number;
}

class RegularPricing implements PricingPolicy {
  discount() {
    return 0;
  }
}

class PremiumPricing implements PricingPolicy {
  discount() {
    return 0.2;
  }
}

class User {
  constructor(
    public id: string,
    public name: string,
    private pricing: PricingPolicy
  ) {}

  discount() {
    return this.pricing.discount();
  }
}

const u1 = new User("1", "Alice", new RegularPricing());
const u2 = new User("2", "Bob", new PremiumPricing());

console.log(u1.discount());
console.log(u2.discount());