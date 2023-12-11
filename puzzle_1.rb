num_hash = {
  'one' => '1',
  'two' => '2',
  'three' => '3',
  'four' => '4',
  'five' => '5',
  'six' => '6',
  'seven' => '7',
  'eight' => '8',
  'nine' => '9'
}

f = File.new('texts/puzzle_1.txt')
integer_lines = f.readlines.map do |line|
  # new_line = ''
  # line.scan(/([0-9]|one|two|three|four|five|six|seven|eight|nine)/) do |num_str_arr|
  #   p num_str = num_str_arr[0]
    
  #   if num_hash.keys.include?(num_str)
  #     new_line << num_hash[num_str]
  #   else
  #     new_line << num_str
  #   end
  # end
  
  # new_line
  line.gsub!('one', 'one1one')
  line.gsub!('two', 'two2two')
  line.gsub!('three', 'three3three')
  line.gsub!('four', 'four4four')
  line.gsub!('five', 'five5five')
  line.gsub!('six', 'six6six')
  line.gsub!('seven', 'seven7seven')
  line.gsub!('eight', 'eight8eight')
  line.gsub!('nine', 'nine9nine')
  line.gsub!(/[a-z]/, '')
  line.gsub!("\n", '')
  p line
end


integer_lines.map! do |line|
  (line[0] + line[-1]).to_i
end

puts integer_lines.sum